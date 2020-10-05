import { types } from "mobx-state-tree";

const Category = types.model("Category", {
  id: types.identifier,
  title: types.string,
});

export default Category;
