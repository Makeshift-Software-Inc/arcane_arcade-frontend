import { types, flow, getParent } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";
import SupportedPlatform from "./SupportedPlatform";
import Distribution from "./Distribution";
import DistributionForm from "../forms/Distribution";

import Api from "../../services/Api";
import deserialize from "../../utils/deserialize";

const SupportedPlatformListing = types
  .model("SupportedPlatformListing", {
    id: types.identifier,
    supported_platform: types.reference(SupportedPlatform),
    distribution: types.maybeNull(Distribution),
    distributionForm: types.optional(DistributionForm, {}),
    creatingDistribution: false,
  })
  .actions((self) => ({
    createDistribution: flow(function* createDistribution() {
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
          { supported_platform_listing }
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
