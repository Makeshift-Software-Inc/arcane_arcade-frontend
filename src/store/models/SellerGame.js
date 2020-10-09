import { types } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";
import SupportedPlatformListing from "./SupportedPlatformListing";

const SellerGame = types
  .model("SellerGame", {
    id: types.identifier,
    slug: types.string,
    title: types.string,
    description: types.string,
    price: types.string,
    images: types.array(types.string),
    videos: types.array(types.string),
    preorderable: types.boolean,
    early_access: types.boolean,
    esrb: types.string,
    btc_amount: types.number,
    xmr_amount: types.number,
    default_currency: types.string,
    currency_symbol: types.string,
    status: types.enumeration(["pending", "active"]),
    supported_platform_listings: types.array(SupportedPlatformListing),
  })
  .views((self) => ({
    distributionsSet() {
      return self.supported_platform_listings
        .filter((platform) => platform.supported_platform.name !== "PC")
        .every((p) => p.distribution);
    },
  }))
  .actions((self) => ({}));

export default types.compose(BaseUpdate, SellerGame);
