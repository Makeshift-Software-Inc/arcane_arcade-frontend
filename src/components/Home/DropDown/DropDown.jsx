import React, {useState} from 'react';

import arrowIcon from './../../../img/light-combo-box-bg.png';

import './DropDown.scss';

const DropDown = ({ content, onChange, children, activeTab }) => {

  const [close, setClose] = useState(true);

  return (
    <div className="homepage-dropdown flex-column">
      <button className="drop-btn flex-row align-center" onClick={() => setClose(!close) }>
        {activeTab}
        <img src={arrowIcon} className={`arrow-icon ${!close ? 'open' : ''}`} alt="arrow-icon"/>
      </button>
      {
        !close && 
        <div className="dropdown-content flex-column justify-flex-start" onClick={() => setClose(true) }>
         {children}
        </div>
      }
    </div>
)};

export default DropDown;