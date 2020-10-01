import { types } from "mobx-state-tree";
import SignUp from "./forms/SignUp";
import Login from "./forms/Login";
import TwoFactorAuth from "./forms/TwoFactorAuth";

const FormsStore = types
  .model("Forms", {
    signUp: types.optional(SignUp, {}),
    login: types.optional(Login, {}),
    two_factor_auth: types.optional(TwoFactorAuth, {}),
  })
  .actions((self) => ({}));

export default FormsStore;
