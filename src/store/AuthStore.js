import { types, flow, getRoot } from "mobx-state-tree";
import User from "./models/User";
import Api from "../services/Api";

const AuthStore = types
  .model("Auth", {
    user: types.maybeNull(User),
    isLoggedIn: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    signUp: flow(function* signUp() {
      const { forms } = getRoot(self);

      const keysToSend = [
        "username",
        "password",
        "password_confirmation",
        "email",
        "phone_number",
      ];

      try {
        const response = yield Api.post("/users", {
          user: forms.signUp.keys(keysToSend),
        });
        self.user = response.data.data;
        // FIXME: are we sure we want users to be logged in immedietly after signup?
        self.isLoggedIn = true;
        return true;
      } catch (e) {
        console.log(e);
        if (e.response && e.response.data) {
          forms.signUp.errors.update(e.response.data);
        }
        return false;
      }
    }),
    login: flow(function* login() {
      const { forms } = getRoot(self);

      const keysToSend = ["username", "password"];

      try {
        const response = yield Api.post("/login", {
          user: forms.login.keys(keysToSend),
        });
        self.user = response.data.data;
        self.isLoggedIn = true;
        return true;
      } catch (e) {
        console.log(e);
        if (e.response && e.response.data) {
          forms.login.errors.update(e.response.data);
        }
        return false;
      }
    }),
  }));

export default AuthStore;
