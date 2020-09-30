import React from "react";
import Error from "./Error";

import "./Errors.scss";

const Errors = ({ errors }) => (
  <div className="errors">
    {errors.map((error) => (
      <Error error={error} key={error} />
    ))}
  </div>
);

export default Errors;
