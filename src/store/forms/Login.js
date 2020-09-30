import { types } from "mobx-state-tree";
import Base from "./Base";
import Errors from "./Errors";

const Login = types
  .model("Login", {
    username: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    errors: types.optional(Errors, {}),
  })
  .actions((self) => ({
    validate: () => {
      // TODO: Validate here (check ./SignUp for details)

      // validateUsername(usernameInput) {
      //   var usernameRegex = /^[a-zA-Z0-9]+$/;
      //   const username = usernameInput.value;
      //   if (username === "" || !username.match(usernameRegex)) {
      //     usernameInput.classList.add("error");

      //     return;
      //   } else {
      //     usernameInput.classList.remove("error");
      //   }

      //   return username;
      // }

      return true;
    },
  }));

export default types.compose(Base, Login);
