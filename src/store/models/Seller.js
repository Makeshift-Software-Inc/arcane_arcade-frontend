import { types } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";

const Seller = types.model("Seller", {
  id: types.identifier,
  accepted_crypto: types.array(types.string),
  business_name: types.string,
  default_currency: types.string,
  studio_size: types.string,
});

export default types.compose(BaseUpdate, Seller);
