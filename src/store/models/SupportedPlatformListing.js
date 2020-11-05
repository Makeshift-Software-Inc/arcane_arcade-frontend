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
    createPCInstallers: flow(function* createPCInstallers() {
      self.creatingDistribution = true;
      const listing = getParent(self, 2);
      const platforms = self.getChildrenPlatforms();

      const data = {
        listing: {
          supported_platform_listings_attributes: [
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

      try {
        const response = yield Api.post(
          `listings/${listing.id}/add_distributions`,
          data,
        );
        console.log(response.data);
        console.log(deserialize(response.data));
        listing.update({
          supported_platform_listings: deserialize(response.data),
        });
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
    createDistribution: flow(function* createDistribution() {
      if (
        self.supported_platform.name === 'PC'
        && self.distributionForm.method === 'installer'
      ) {
        return yield self.createPCInstallers();
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

        console.log(deserialize(response.data));
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
