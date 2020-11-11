import React from 'react';

import './UpdateStatus.scss';

const UpdateStatus = ({ handleUpdate }) => (
  <div className="update-status-actions flex-row justify-between">
    <button
      type="button"
      className="action"
      value="active"
      onClick={handleUpdate}
    >
      Activate
    </button>
    <button
      type="button"
      className="action reject"
      value="rejected"
      onClick={handleUpdate}
    >
      Reject
    </button>
  </div>
);

export default UpdateStatus;
