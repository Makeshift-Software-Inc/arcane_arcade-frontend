import React, { useEffect, createRef } from "react";
import { observer } from "mobx-react";

import "intl-tel-input/build/css/intlTelInput.css";
import "intl-tel-input/build/js/utils.js";
import intlTelInput from "intl-tel-input";

import { useStore } from "../../store";

import Navbar from "../../components/Navbar/Navbar";
import Errors from "../../components/Errors/Errors";

import "./SignUp.scss";

const SignUpPage = ({ history }) => {
  const phoneNumberRef = createRef(null);

  useEffect(() => {
    intlTelInput(phoneNumberRef.current, {
      utilsScript: "../../node_modules/intl-tel-input/build/js/utils.js",
      separateDialCode: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    auth: authStore,
    forms: { signUp },
  } = useStore();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (signUp.validate()) {
      if (await authStore.signUp()) {
        history.push("/authorize");
      }
    }
  };

  return (
    <div className="App sign-up">
      <Navbar />

      <h1>Sign Up</h1>
      <form className="normal-signup" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className={`topcoat-text-input ${
              signUp.errors.errors &&
              signUp.errors.errors.hasOwnProperty("username")
                ? "error"
                : ""
            }`}
            name="username"
            placeholder="Username"
            value={signUp.username}
            onChange={signUp.onChange}
          />
        </div>

        <div className="password-fields">
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className={`topcoat-text-input ${
                signUp.errors.errors &&
                signUp.errors.errors.hasOwnProperty("password")
                  ? "error"
                  : ""
              }`}
              name="password"
              placeholder="Password"
              value={signUp.password}
              onChange={signUp.onChange}
            />
          </div>

          <div className="field">
            <input
              type="password"
              id="password_confirmation"
              className={`topcoat-text-input ${
                signUp.errors.errors &&
                signUp.errors.errors.hasOwnProperty("password_confirmation")
                  ? "error"
                  : ""
              }`}
              name="password_confirmation"
              placeholder="Confirm Password"
              value={signUp.password_confirmation}
              onChange={signUp.onChange}
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className={`topcoat-text-input ${
              signUp.errors.errors &&
              signUp.errors.errors.hasOwnProperty("email")
                ? "error"
                : ""
            }`}
            name="email"
            placeholder="Email"
            value={signUp.email}
            onChange={signUp.onChange}
          />
        </div>

        <div className="field phone">
          <label htmlFor="phone_number">Phone Number</label>
          <input
            type="tel"
            id="phone_number"
            className={`topcoat-text-input ${
              signUp.errors.errors &&
              signUp.errors.errors.hasOwnProperty("phone_number")
                ? "error"
                : ""
            }`}
            maxLength="16"
            name="phone_number"
            placeholder="Phone Number"
            ref={phoneNumberRef}
            value={signUp.phone_number}
            onChange={signUp.onChange}
          />
        </div>

        <Errors errors={signUp.errors.full_messages.toJSON()} />

        <button type="submit" className="topcoat-button--large continue">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default observer(SignUpPage);
