import { types, flow, getRoot } from "mobx-state-tree";
import User from "./models/User";
import Api from "../services/Api";

import deserialize from "../utils/deserialize";

const AuthStore = types
  .model("Auth", {
    user: types.maybeNull(User),
    isLoggedIn: types.optional(types.boolean, false),
    loading: true,
  })
  .views((self) => ({}))
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
        self.user = deserialize(response.data.data);
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
        self.user = deserialize(response.data.data);
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
    checkLoggedIn: flow(function* checkLoggedIn() {
      self.loading = true;

      try {
        const response = yield Api.get("/logged_in");
        self.user = deserialize(response.data.data);
        self.isLoggedIn = true;
        self.loading = false;
        return true;
      } catch (e) {
        console.log(e);
        self.user = null;
        self.isLoggedIn = false;
        self.loading = false;
        return false;
      }
    }),
    sendAuthCode: flow(function* sendAuthCode() {
      const { forms } = getRoot(self);

      if (!forms.two_factor_auth.delivery_method) {
        forms.two_factor_auth.update({ codeSent: false });
        return false;
      }

      const keysToSend = ["delivery_method"];

      self.loading = true;

      try {
        yield Api.post("/send_auth_token", {
          auth: forms.two_factor_auth.keys(keysToSend),
        });

        forms.two_factor_auth.update({ codeSent: true });
        self.loading = false;
        return true;
      } catch (e) {
        if (e.response && e.response.data) {
          forms.two_factor_auth.errors.update(e.response.data);
        }
        self.loading = false;
        return false;
      }
    }),
    authorize: flow(function* authorize(code) {
      if (!code || code.length !== 7) return false;

      self.loading = true;

      const { forms } = getRoot(self);

      try {
        yield Api.post("/authorize", {
          auth: { code },
        });
        self.user.update({ activation_state: "active" });
        self.loading = false;
        return true;
      } catch (e) {
        if (e.response && e.response.data) {
          forms.two_factor_auth.errors.update(e.response.data);
        }
        self.loading = false;
        return false;
      }
    }),
    logout: flow(function* logout() {
      try {
        yield Api.delete("/logout");
        self.user = null;
        self.isLoggedIn = false;
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }),
  }));

export default AuthStore;
