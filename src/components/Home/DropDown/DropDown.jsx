import React, {useState} from 'react';

import AdvancedSearch from '../AdvancedSearch';

import arrowIcon from './../../../img/light-combo-box-bg.png';

import './DropDown.scss';

const DropDown = ({ content, onChange, children, activeTab }) => {

  const [close, setClose] = useState(true);

  return (
    <div className="homepage-dropdown flex-column">
    <div className="flex-row drop-bar">
      <button className="drop-btn flex-row align-center" onClick={() => setClose(!close) }>
        {activeTab}
        <img src={arrowIcon} className={`arrow-icon ${!close ? 'open' : ''}`} alt="arrow-icon"/>
      </button>
      {activeTab === 'discover' && <AdvancedSearch showFilters={false} /> }
      </div>
      {
        !close &&
        <div className="dropdown-content flex-column justify-flex-start" onClick={() => setClose(true) }>
         {children}
        </div>
      }
    </div>
)};

export default DropDown;