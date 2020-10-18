import React from 'react';

import './Loading.scss';

const Loading = ({ text, small, white }) => (
  <div
    className={`loader-wrapper ${small ? 'is-small' : ''} ${
      white ? 'is-white' : ''
    }`}
  >
    <div className="loader" />
    {text && <p>{text}</p>}
  </div>
);

export default Loading;
