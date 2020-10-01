import { types } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";

const Notification = types.model("Notification", {
  seen: types.boolean,
  destination_path: types.maybe(types.string),
  message: types.string,
});

export default types.compose(BaseUpdate, Notification);
