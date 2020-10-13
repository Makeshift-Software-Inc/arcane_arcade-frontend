import React from 'react';

import Question from '../../Question/Question';
import Select from '../../../Form/Select/Select';

const Currency = ({ update, fiatCurrency }) => {
  const onChange = (e) => {
    update({ fiatCurrency: e.target.value });
  };

  const currencies = [
    { value: 'USD', text: 'USD - US Dollar' },
    { value: 'EUR', text: 'EUR - Euro' },
    { value: 'JPY', text: 'JPY - Japanese Yen' },
    { value: 'GBP', text: 'GBP - British Pound' },
    { value: 'AUD', text: 'AUD - Australian Dollar' },
    { value: 'CAD', text: 'CAD - Canadian Dollar' },
    { value: 'CHF', text: 'CHF - Swiss Franc' },
    { value: 'CNY', text: 'CNY - Chinese Yuan' },
    { value: 'SEK', text: 'SEK - Swedish Krona' },
    { value: 'NZD', text: 'NZD - New Zealand Dollar' },
  ];

  return (
    <React.Fragment>
      <Question text="Which fiat currency will you be pricing in?" />
      <Select options={currencies} value={fiatCurrency} onChange={onChange} />
    </React.Fragment>
  );
};

export default Currency;
