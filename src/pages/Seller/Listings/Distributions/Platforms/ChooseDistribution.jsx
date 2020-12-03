import React from 'react';
import { observer } from 'mobx-react';

import Toggler from '../../../../../components/Form/Toggler/Toggler';

const ChooseDistribution = ({ options, onChange, selected }) => (
  <div className="choose-distribution flex-row">
    <Toggler options={options} selected={selected} onChange={onChange} />
  </div>
);

export default observer(ChooseDistribution);
