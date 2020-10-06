import { types } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";

const Tag = types.model("Tag", {
  id: types.identifier,
  name: types.string,
  disabled: false,
});

export default types.compose(BaseUpdate, Tag);
