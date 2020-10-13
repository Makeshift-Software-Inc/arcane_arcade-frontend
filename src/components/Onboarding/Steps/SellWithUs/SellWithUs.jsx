import React from 'react';

import Question from '../../Question/Question';
import YesNoOptions from '../../../Form/YesNoOptions/YesNoOptions';

const SellWithUs = ({ update, sellWithUs }) => {
  const toggle = () => {
    update({ sellWithUs: !sellWithUs });
  };

  return (
    <React.Fragment>
      <Question text="Are you interested in selling your game(s) on Arcane Arcade?" />

      <YesNoOptions name="sellWithUs" isTrue={sellWithUs} toggle={toggle} />
    </React.Fragment>
  );
};

export default SellWithUs;
