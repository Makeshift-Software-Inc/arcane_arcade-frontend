import { types } from "mobx-state-tree";
import SignUp from "./forms/SignUp";
import Login from "./forms/Login";
import TwoFactorAuth from "./forms/TwoFactorAuth";
import Onboarding from "./forms/Onboarding";
import Listing from "./forms/Listing";

const FormsStore = types
  .model("Forms", {
    signUp: types.optional(SignUp, {}),
    login: types.optional(Login, {}),
    two_factor_auth: types.optional(TwoFactorAuth, {}),
    onboarding: types.optional(Onboarding, {}),
    listing: types.optional(Listing, {}),
  })
  .actions((self) => ({}));

export default FormsStore;
