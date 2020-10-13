import React from 'react';

import './YesNoOptions.scss';

const YesNoOptions = ({ name, isTrue, toggle }) => (
  <div className="arcane-yes-no-options flex-row">
    <div className="flex-row align-center">
      <input
        type="radio"
        name={name}
        id="option-true"
        checked={isTrue}
        value
        onChange={toggle}
      />
      <label className="option-label" htmlFor="option-true">
        Yes
      </label>
    </div>
    <div className="flex-row align-center">
      <input
        type="radio"
        name={name}
        id="option-false"
        checked={!isTrue}
        value={false}
        onChange={toggle}
      />
      <label className="option-label" htmlFor="option-false">
        No
      </label>
    </div>
  </div>
);

export default YesNoOptions;
