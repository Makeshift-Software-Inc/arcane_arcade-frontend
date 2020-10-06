import { types } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";

const Category = types.model("Category", {
  id: types.identifier,
  title: types.string,
});

export default types.compose(BaseUpdate, Category);
