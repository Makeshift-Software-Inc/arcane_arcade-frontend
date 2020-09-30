import { types } from "mobx-state-tree";
import Base from "./Base";
import Errors from "./Errors";

const SignUp = types
  .model("SignUp", {
    username: types.optional(types.string, ""),
    password: types.optional(types.string, ""),
    password_confirmation: types.optional(types.string, ""),
    email: types.optional(types.string, ""),
    phone_number: types.optional(types.string, ""),
    errors: types.optional(Errors, {}),
  })
  .actions((self) => ({
    validate: () => {
      // TODO: Validate all fields here, and at the end append error messages like this:
      // const errors = {};
      // errors.username = ["can't be blank"];
      // self.errors.update({ errors });

      //   const isNumericInput = (event) => {
      //     const key = event.keyCode;
      //     return (
      //       (key >= 48 && key <= 57) || // Allow number line
      //       (key >= 96 && key <= 105) // Allow number pad
      //     );
      //   };

      //   const isModifierKey = (event) => {
      //     const key = event.keyCode;
      //     return (
      //       event.shiftKey === true ||
      //       key === 35 ||
      //       key === 36 || // Allow Shift, Home, End
      //       key === 8 ||
      //       key === 9 ||
      //       key === 13 ||
      //       key === 46 || // Allow Backspace, Tab, Enter, Delete
      //       (key > 36 && key < 41) || // Allow left, up, right, down
      //       // Allow Ctrl/Command + A,C,V,X,Z
      //       ((event.ctrlKey === true || event.metaKey === true) &&
      //         (key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
      //     );
      //   };

      //   const enforceFormat = (event) => {
      //     // Input must be of a valid number format or a modifier key, and not longer than ten digits
      //     if (!isNumericInput(event) && !isModifierKey(event)) {
      //       event.preventDefault();
      //     }
      //   };

      //   const formatToPhone = (event) => {
      //     if (isModifierKey(event)) {
      //       return;
      //     }

      //     // I am lazy and don't like to type things more than once
      //     const target = event.target;
      //     const input = target.value.replace(/\D/g, "").substring(0, 10); // First ten digits of input only
      //     const zip = input.substring(0, 3);
      //     const middle = input.substring(3, 6);
      //     const last = input.substring(6, 10);

      //     if (input.length > 6) {
      //       target.value = `(${zip}) ${middle} - ${last}`;
      //     } else if (input.length > 3) {
      //       target.value = `(${zip}) ${middle}`;
      //     } else if (input.length > 0) {
      //       target.value = `(${zip}`;
      //     }
      //   };

      //   input.addEventListener("keydown", enforceFormat);
      //   input.addEventListener("keyup", formatToPhone);
      // }

      // validPassword(form) {
      //   const password = form.querySelector("input#password");
      //   const confirmation = form.querySelector("input#password_confirmation");
      //   const matchingPasswords = password.value === confirmation.value;

      //   if (!matchingPasswords) {
      //     password.classList.add("error");
      //     confirmation.classList.add("error");
      //   } else {
      //     password.classList.remove("error");
      //     confirmation.classList.remove("error");
      //   }

      //   return matchingPasswords;
      // }

      // validateUsername(usernameInput) {
      //   var usernameRegex = /^[a-zA-Z0-9]+$/;
      //   const username = usernameInput.value;
      //   if (username === "" || !username.match(usernameRegex)) {
      //     // todo: CHECK IF TAKEN
      //     usernameInput.classList.add("error");

      //     return;
      //   } else {
      //     usernameInput.classList.remove("error");
      //   }

      //   return username;
      // }

      // validatePhoneNumber(phoneInput) {
      //   const countryCode = document.querySelector(".iti__selected-dial-code")
      //     .innerText;

      //   if (phoneInput.value === "") {
      //     phoneInput.classList.add("error");

      //     return;
      //   } else {
      //     phoneInput.classList.remove("error");
      //   }

      //   return countryCode + phoneInput.value;
      // }

      // return true if all fields are valid, otherwise false if any field is invalid.
      return true;
    },
  }));

export default types.compose(Base, SignUp);
