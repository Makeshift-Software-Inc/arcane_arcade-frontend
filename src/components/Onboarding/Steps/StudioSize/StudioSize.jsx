import React from 'react';

import Question from '../../Question/Question';
import Toggler from '../../../Form/Toggler/Toggler';

const StudioSize = ({ update, studioSize }) => {
  const handleChange = (value) => {
    update({ studioSize: value });
  };
  const options = [
    { value: 'INDIE', text: 'Indie' },
    { value: 'MIDSIZE', text: 'Mid-Size' },
    { value: 'AAA', text: 'AAA' },
  ];
  return (
    <React.Fragment>
      <Question text="Which best describes the size of your game company?" />
      <Toggler
        options={options}
        selected={studioSize}
        onChange={handleChange}
      />
    </React.Fragment>
  );
};

export default StudioSize;
