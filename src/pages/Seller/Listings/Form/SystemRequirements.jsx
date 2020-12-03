import React, { Fragment, useState } from 'react';
import { observer } from 'mobx-react';

import useBreakpoints from '../../../../hooks/useBreakpoints';

import SystemRequirementsTabs from '../../../../components/Tabs/SystemRequirementsTabs';

const Requirements = observer(({ requirement }) => requirement.keys().map((key) => (
  <div key={key} className="flex-column">
    <span className="content-item-label">{key}</span>
    <input
      type="text"
      name={key === 'directX' ? key : key.toLowerCase()}
      onChange={requirement.onChange}
      value={requirement[key === 'directX' ? key : key.toLowerCase()]}
    />
  </div>
)));

const SystemRequirements = ({ system_requirements }) => {
  const [selectedTab, setSelectedTab] = useState(
    system_requirements[0].platform,
  );
  const [selectedMobileTab, setSelectedMobileTab] = useState('Minimum');

  const { isMobile } = useBreakpoints();

  const tabOptions = system_requirements.map(
    (requirement) => requirement.platform,
  );

  const mobileTabOptions = ['Minimum', 'Recommended'];

  const selectedRequirement = system_requirements.find(
    (requirement) => requirement.platform === selectedTab,
  );

  if (!selectedRequirement) {
    if (system_requirements.length > 0) {
      setSelectedTab(system_requirements[0].platform);
    }
    return null;
  }

  return (
    <div className="system-requirements">
      <label className="label">System Requirements</label>

      <SystemRequirementsTabs
        options={tabOptions}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />

      {selectedTab && (
        <Fragment>
          <div
            className={`flex-column system-requirements-content ${
              isMobile ? 'mobile' : ''
            }`}
          >
            {isMobile && (
              <SystemRequirementsTabs
                mobile
                options={mobileTabOptions}
                selectedTab={selectedMobileTab}
                setSelectedTab={setSelectedMobileTab}
              />
            )}
            <div className="flex-row">
              {(!isMobile || selectedMobileTab === 'Minimum') && (
                <div className="flex-column flex-1 content-item">
                  <span className="content-item-text">Minimum</span>
                  <Requirements requirement={selectedRequirement.minimum} />
                </div>
              )}
              {(!isMobile || selectedMobileTab === 'Recommended') && (
                <div className="flex-column flex-1 content-item">
                  <span className="content-item-text">Recommended</span>
                  <Requirements requirement={selectedRequirement.recommended} />
                </div>
              )}
            </div>
            <div className="flex-column flex-1 content-item">
              <span className="content-item-label">Additional Notes</span>
              <textarea
                value={selectedRequirement.additional_notes}
                name="additional_notes"
                onChange={selectedRequirement.onChange}
              />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default observer(SystemRequirements);
