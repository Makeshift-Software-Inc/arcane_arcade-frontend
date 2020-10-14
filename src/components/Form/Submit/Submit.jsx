import React from 'react';

import './Submit.scss';

const Submit = ({ green, text }) => (
  <button
    type="submit"
    className={`button is-link is-small submit-button ${
      green ? 'is-green' : ''
    }`}
  >
    {text}
  </button>
);

export default Submit;
