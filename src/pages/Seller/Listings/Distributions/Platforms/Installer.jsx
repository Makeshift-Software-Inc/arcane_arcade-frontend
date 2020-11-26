import React, { useState } from 'react';
import { observer } from 'mobx-react';

const Installer = ({ platform }) => {
  const [canDrop, setCanDrop] = useState(false);

  const cancelDrop = (e) => {
    e.preventDefault();
    setCanDrop(false);
  };

  const allowDrop = (e) => {
    e.preventDefault();
    setCanDrop(true);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setCanDrop(false);
    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i += 1) {
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          platform.distributionForm.addInstaller(file);
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i += 1) {
        platform.distributionForm.addInstaller(e.dataTransfer.files[i]);
      }
    }
  };

  return (
    <div className="uploader">
      <h4>
        Installer for
        {platform.supported_platform.name}
      </h4>
      <div
        className="drop-placeholder"
        onDrop={handleDrop}
        onDragOver={allowDrop}
        onDragLeave={cancelDrop}
      >
        {platform.distributionForm.installer ? (
          <h4>
            Installer for
            {' '}
            {platform.supported_platform.name}
            {' '}
            added
            {' '}
            {platform.distributionForm.installer.name}
          </h4>
        ) : (
          <h4>
            Drop installer for
            {platform.supported_platform.name}
            {' '}
            here
          </h4>
        )}
        {canDrop && <h1>Drop now</h1>}
      </div>
      {platform.distributionForm.installer && (
        <div className="progress">
          <div
            className="progress-bar"
            style={{
              width: `${platform.distributionForm.installer.progress}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default observer(Installer);
