import { types } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";

const Distribution = types.model("Distribution", {
  id: types.identifier,
});

export default types.compose(BaseUpdate, Distribution);
