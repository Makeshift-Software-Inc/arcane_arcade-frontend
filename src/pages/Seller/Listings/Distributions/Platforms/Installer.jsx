import React, { Fragment, useState } from 'react';
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
      if (e.dataTransfer.items[0].kind === 'file') {
        const file = e.dataTransfer.items[0].getAsFile();
        platform.distributionForm.addInstaller(file);
      }
    } else {
      platform.distributionForm.addInstaller(e.dataTransfer.files[0]);
    }
  };

  const platformName = platform.supported_platform.name.charAt(0).toUpperCase()
    + platform.supported_platform.name.slice(1).toLowerCase();

  const hasInstaller = platform.distributionForm.installer
    || platform.distributionForm.installer_url;

  const content = () => {
    if (!hasInstaller) return null;

    if (platform.distributionForm.installer) {
      return (
        <p className="text-overflow">
          {platform.distributionForm.installer.name}
        </p>
      );
    }

    return (
      <a
        href={platform.distributionForm.installer_url}
        target="_blank"
        rel="noopener noreferrer"
        className="uploaded"
      >
        Download
      </a>
    );
  };

  return (
    <div className="uploader relative">
      <div
        className="drop-placeholder flex-column align-center justify-evenly text-center"
        onDrop={handleDrop}
        onDragOver={allowDrop}
        onDragLeave={cancelDrop}
      >
        <p className="platform-name">
          {platformName}
          {' '}
          Installer
        </p>
        {canDrop ? (
          <p>Drop now</p>
        ) : (
          <Fragment>
            {content()}
            <p>
              Drag & Drop
              {hasInstaller && ' to change'}
            </p>
          </Fragment>
        )}
      </div>
      {platform.distributionForm.installer
        && platform.distributionForm.installer.loading && (
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
