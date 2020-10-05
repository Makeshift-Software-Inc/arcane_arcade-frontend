import { types } from "mobx-state-tree";

const SupportedPlatform = types.model("SupportedPlatform", {
  id: types.identifier,
  name: types.string,
  children: types.array(types.late(() => SupportedPlatform)),
});

export default SupportedPlatform;
