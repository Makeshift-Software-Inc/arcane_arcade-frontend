import React from "react";
import { Link } from "react-router-dom";

import logo from "../../img/temp-logo.png";

const Welcome = ({ onAnimationEnd }) => {
  return (
    <>
      <div className="welcome magictime puffIn" onAnimationEnd={onAnimationEnd}>
        <h1> Welcome </h1>
      </div>
      <div className="logo magictime puffIn">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
    </>
  );
};

export default Welcome;
