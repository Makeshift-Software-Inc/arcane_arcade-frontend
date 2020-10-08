import { types, getParent } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";
import Distribution from "./Distribution";
import SupportedPlatform from "./SupportedPlatform";

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
    distribution: types.maybeNull(Distribution),
    supported_platforms: types.array(types.reference(SupportedPlatform)),
  })
  .actions((self) => ({}));

export default types.compose(BaseUpdate, SellerGame);
