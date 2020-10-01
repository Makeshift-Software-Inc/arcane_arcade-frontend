import { types } from "mobx-state-tree";
import Base from "./Base";
import Errors from "./Errors";

const TwoFactorAuth = types
  .model("TwoFactorAuth", {
    delivery_method: types.maybe(types.enumeration(["sms", "email"])),
    // TODO: return this to false
    codeSent: true,
    errors: types.optional(Errors, {}),
  })
  .actions((self) => ({
    validate: () => {
      // TODO: Validate here (check ./SignUp for details)
      return true;
    },
  }));

export default types.compose(Base, TwoFactorAuth);
