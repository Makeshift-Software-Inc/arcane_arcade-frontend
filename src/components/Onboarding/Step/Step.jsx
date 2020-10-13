import React from 'react';

import './Step.scss';

const Step = ({ number }) => (
  <small className="current-step align-self-start">
    STEP
    {number}
    {' '}
    OF 6
  </small>
);

export default Step;
