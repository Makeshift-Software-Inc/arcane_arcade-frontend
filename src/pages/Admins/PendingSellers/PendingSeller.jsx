import React, { Fragment } from 'react';

import { observer } from 'mobx-react';

import Actions from '../Actions/UpdateStatus';
import Loading from '../../../components/Loading/Loading';

import './PendingSeller.scss';

const PendingSeller = ({ seller }) => {
  const content = (
    <Fragment>
      <div className="flex-row justify-between">
        <p className="label">STATUS:</p>
        <p className="value">{seller.status.toUpperCase()}</p>
      </div>
      <div className="flex-row justify-between">
        <p className="label">BUSINESS NAME:</p>
        <p className="value">{seller.business_name}</p>
      </div>

      <Actions handleUpdate={seller.handleStatusUpdate} />
    </Fragment>
  );

  return (
    <div className="pending-seller flex-grow">
      {seller.updating ? <Loading small text="Updating..." /> : content}
    </div>
  );
};

export default observer(PendingSeller);
