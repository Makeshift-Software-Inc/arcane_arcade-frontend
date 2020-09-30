import { types } from "mobx-state-tree";

const User = types.model("User", {
  username: types.string,
  email: types.string,
});

export default User;
