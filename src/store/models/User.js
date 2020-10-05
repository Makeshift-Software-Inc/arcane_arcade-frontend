import { types, flow, getRoot } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";
import Seller from "./Seller";

import Api from "../../services/Api";
import deserialize from "../../utils/deserialize";

const User = types
  .model("User", {
    id: types.identifier,
    username: types.string,
    email: types.string,
    phone_number: types.string,
    activation_state: types.enumeration(["pending", "active"]),
    seller: types.maybe(Seller),
    loadingSeller: false,
  })
  .views((self) => ({
    activated() {
      return self.activation_state === "active";
    },
    isSeller() {
      const SELF = self;;
      return !!self.seller;
    },
  }))
  .actions((self) => ({
    createSeller: flow(function* create() {
      self.loadingSeller = true;

      const {
        forms: {
          onboarding: { acceptedCrypto, fiatCurrency, companyName, studioSize },
        },
      } = getRoot(self);

      const seller = {
        accepted_crypto: acceptedCrypto,
        default_currency: fiatCurrency,
        business_name: companyName,
        studio_size: studioSize,
      };

      try {
        const response = yield Api.post("/sellers", { seller: seller });
        self.seller = response.data.data.attributes;
        console.log(response);
        self.loadingSeller = false;
        return true;
      } catch (e) {
        console.log(e);
        self.loadingSeller = false;
        return false;
      }
    }),
  }));

export default types.compose(BaseUpdate, User);
