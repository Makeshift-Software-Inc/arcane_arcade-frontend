import { types } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";
import UploadedFile from "./UploadedFile";

const Distribution = types
  .model("Distribution", {
    id: types.identifier,
    steam_keys: types.array(types.string),
    installer: types.maybeNull(UploadedFile),
    method: types.enumeration(["steam_keys", "installer"]),
  })
  .actions((self) => ({}));

export default types.compose(BaseUpdate, Distribution);
