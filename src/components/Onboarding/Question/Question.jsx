import React from 'react';

import './Question.scss';

const Question = ({ text }) => (
  <p className="question align-self-start">{text}</p>
);

export default Question;
