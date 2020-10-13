import React from 'react';

import './Submit.scss';

const Submit = ({ finish }) => (
  <button
    type="submit"
    className={`button is-link is-small ${finish ? 'is-finish' : ''}`}
  >
    {finish ? 'FINISH' : 'NEXT'}
  </button>
);

export default Submit;
