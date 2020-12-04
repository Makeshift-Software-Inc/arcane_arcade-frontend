import React from 'react';

import './Step.scss';

const Step = ({ number }) => (
  <small className="current-step align-self-start">
    STEP&nbsp;
    {number}
&nbsp;OF&nbsp;6
  </small>
);

export default Step;
