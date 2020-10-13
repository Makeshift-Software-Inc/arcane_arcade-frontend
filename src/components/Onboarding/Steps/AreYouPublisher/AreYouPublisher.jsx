import React from 'react';

import Question from '../../Question/Question';
import YesNoOptions from '../../../Form/YesNoOptions/YesNoOptions';

const AreYouPublisher = ({ update, isSeller }) => {
  const toggle = () => {
    update({ isSeller: !isSeller });
  };

  return (
    <React.Fragment>
      <Question text="Are you a game developer or publisher?" />

      <YesNoOptions name="isSeller" isTrue={isSeller} toggle={toggle} />
    </React.Fragment>
  );
};

export default AreYouPublisher;
