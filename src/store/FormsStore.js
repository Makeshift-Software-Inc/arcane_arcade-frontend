import { types } from "mobx-state-tree";
import SignUp from "./forms/SignUp";
import Login from "./forms/Login";

const FormsStore = types
  .model("Forms", {
    signUp: types.optional(SignUp, {}),
    login: types.optional(Login, {}),
  })
  .actions((self) => ({}));

export default FormsStore;
