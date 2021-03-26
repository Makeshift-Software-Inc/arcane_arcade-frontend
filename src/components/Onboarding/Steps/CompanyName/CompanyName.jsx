import React from 'react';
import { observer } from 'mobx-react';

import Question from '../../Question/Question';
import Input from '../../../Form/Input/Input';

const CompanyName = ({ update, companyName, errors }) => {
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
        className={errors.hasError('companyName') ? 'input-with-error' : ''}
        error={
          errors.hasError('companyName') && errors.getErrors('companyName')
        }
      />
    </React.Fragment>
  );
};

export default observer(CompanyName);
