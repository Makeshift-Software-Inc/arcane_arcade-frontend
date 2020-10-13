import React from 'react';

import Question from '../../Question/Question';
import Input from '../../../Form/Input/Input';

const CompanyName = ({ update, companyName }) => {
  const handleChange = (e) => update({ companyName: e.target.value });

  return (
    <React.Fragment>
      <Question text="What is the name of your company?" />

      <Input
        type="text"
        name="companyName"
        value={companyName}
        onChange={handleChange}
        placeholder="Enter your company name"
      />
    </React.Fragment>
  );
};

export default CompanyName;
