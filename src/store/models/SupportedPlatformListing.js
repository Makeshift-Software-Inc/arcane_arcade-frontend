import { types, flow, getParent } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';
import SupportedPlatform from './SupportedPlatform';
import Distribution from './Distribution';
import DistributionForm from '../forms/Distribution';
import SystemRequirements from './SystemRequirements';

import Api from '../../services/Api';
import deserialize from '../../utils/deserialize';

const SupportedPlatformListing = types
  .model('SupportedPlatformListing', {
    id: types.maybe(types.string),
    _destroy: false,
    supported_platform: types.reference(SupportedPlatform),
    distribution: types.maybeNull(Distribution),
    distributionForm: types.optional(DistributionForm, {}),
    creatingDistribution: false,
    system_requirements: types.maybeNull(SystemRequirements),
  })
  .views((self) => ({
    getChildrenPlatforms() {
      const supportedPlatformListings = getParent(self);
      return supportedPlatformListings.filter((platform) => ['WINDOWS', 'MAC', 'LINUX'].includes(platform.supported_platform.name));
    },
    uploadingInstallers() {
      if (self.distributionForm.method === 'installer') {
        const platforms = self.getChildrenPlatforms();
        const platformsWithInstallers = platforms.filter(
          (platform) => platform.distributionForm.installer,
        );
        if (platformsWithInstallers.length > 0) {
          return !platformsWithInstallers.every(
            (platform) => platform.distributionForm.installer.uploaded,
          );
        }
      }
      return false;
    },
  }))
  .actions((self) => ({
    updatePCInstallers: flow(function* updatePCInstallers() {
      self.creatingDistribution = true;
      const listing = getParent(self, 2);
      const platforms = self.getChildrenPlatforms();

      let data;

      if (self.distributionForm.method === 'installer') {
        data = {
          listing: {
            supported_platform_listings_attributes: [
              { id: self.id, distribution_attributes: { _destroy: true } },
              ...platforms.map((platform) => ({
                id: platform.id,
                distribution_attributes: {
                  method: 'installer',
                  installer_attributes: platform.distributionForm.installer && {
                    installer: platform.distributionForm.installer.keys(),
                  },
                },
              })),
            ],
          },
        };
      } else {
        data = {
          listing: {
            supported_platform_listings_attributes: [
              {
                id: self.id,
                distribution_attributes: {
                  method: 'steam_keys',
                  steam_keys: self.distributionForm.steam_keys.toJSON(),
                },
              },
              ...platforms.map((platform) => ({
                id: platform.id,
                distribution_attributes: {
                  _destroy: true,
                },
              })),
            ],
          },
        };
      }

      try {
        const response = yield Api.post(
          `listings/${listing.id}/add_distributions`,
          data,
        );
        const deserialized = deserialize(response.data);
        deserialized.forEach((platform) => {
          const foundPlatform = listing.supported_platform_listings.find(
            (p) => p.id === platform.id,
          );
          if (foundPlatform) {
            foundPlatform.update(platform);
            foundPlatform.distributionForm.prepare();
          }
        });

        if (self.distributionForm.method === 'installer') {
          self.distribution = null;
          self.distributionForm.update({ steam_keys: [] });
        } else {
          self.getChildrenPlatforms().forEach((platform) => {
            platform.update({ distribution: null });
            platform.distributionForm.update({
              installer_url: null,
              installer: undefined,
              steam_keys: [],
            });
          });
        }
        self.creatingDistribution = false;
        return true;
      } catch (e) {
        console.log(e);
        if (e.response && e.response.data) {
          console.log(e.response.data);
        }
        self.creatingDistribution = false;
        return false;
      }
    }),
    updateDistribution: flow(function* createDistribution() {
      if (self.supported_platform.name === 'PC') {
        return yield self.updatePCInstallers();
      }

      self.creatingDistribution = true;

      const supported_platform_listing = {
        distribution_attributes: {
          method: self.distributionForm.method,
          steam_keys: self.distributionForm.steam_keys.toJSON(),
          installer_attributes: self.distributionForm.installer && {
            installer: self.distributionForm.installer.keys(),
          },
        },
      };

      const listing = getParent(self, 2);

      try {
        const response = yield Api.put(
          `listings/${listing.id}/supported_platform_listings/${self.id}`,
          { supported_platform_listing },
        );

        self.update(deserialize(response.data));
        self.creatingDistribution = false;
        return true;
      } catch (e) {
        console.log(e);
        if (e.response && e.response.data) {
          console.log(e.response.data);
        }
        self.creatingDistribution = false;
        return false;
      }
    }),
  }));

export default types.compose(BaseUpdate, SupportedPlatformListing);
