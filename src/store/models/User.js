import { types } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";

const User = types
  .model("User", {
    id: types.identifier,
    username: types.string,
    email: types.string,
    phone_number: types.string,
    activation_state: types.enumeration(["pending", "active"]),
  })
  .views((self) => ({
    activated() {
      return self.activation_state === "active";
    },
  }));

export default types.compose(BaseUpdate, User);
