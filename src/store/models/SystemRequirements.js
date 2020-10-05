import { types } from "mobx-state-tree";

const SystemRequirements = types
  .model("SystemRequirements", {
    name: types.string,
    description: types.optional(types.string, ""),
  })
  .actions((self) => ({
    onChange(e) {
      self[e.target.name] = e.target.value;
    },
  }));

export default SystemRequirements;
