import React, {useState} from 'react';

import './DropDown.scss';

const DropDown = ({ content, onChange, children, activeTab }) => {

  const [close, setClose] = useState(true);

  return (
    <div className="homepage-dropdown flex-column">
      <button className="drop-btn" onClick={() => setClose(!close) }>{activeTab}</button>
      {
        !close && 
        <div className="dropdown-content flex-column justify-flex-start" onClick={() => setClose(true) }>
         {children}
        </div>
      }
    </div>
)};

export default DropDown;