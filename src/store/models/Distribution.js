import { types } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";

const Distribution = types
  .model("Distribution", {
    id: types.identifier,
    steam_keys: types.maybeNull(types.array(types.string)),
    installer_url: types.maybeNull(types.string),
    method: types.enumeration(["steam_keys", "installer"]),
  })
  .actions((self) => ({}));

export default types.compose(BaseUpdate, Distribution);
