import React, { useState } from "react";

const CompanyName = ({
  style,
  nextStep,
  update,
  onTransitionEnd,
  companyName,
}) => {
  const [error, setError] = useState(null);
  const handleChange = (e) => update({ companyName: e.target.value });

  const next = (e) => {
    e.preventDefault();
    if (companyName.trim().length > 2) {
      nextStep(e);
    } else {
      setError("Company name is required");
    }
  };

  return (
    <form
      className="company-name"
      onSubmit={next}
      style={style}
      onTransitionEnd={onTransitionEnd}
    >
      <ul className="questions">
        <li>
          <p>What is the name of your company?</p>

          <div className="answer">
            <input
              type="text"
              className={`topcoat-text-input ${error ? "error" : ""}`}
              onChange={handleChange}
              placeholder="Company Name"
              value={companyName}
            />
          </div>

          <button type="submit" className="topcoat-button--large continue">
            Continue
          </button>
        </li>
      </ul>
    </form>
  );
};

export default CompanyName;
