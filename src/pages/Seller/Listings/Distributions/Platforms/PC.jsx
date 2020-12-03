import React from 'react';
import { observer } from 'mobx-react';

import Errors from '../../../../../components/Errors/Errors';

import ChooseDistribution from './ChooseDistribution';
import SteamKeys from './SteamKeys';
import Installers from './Installers';

const PC = ({ platform, create }) => {
  const childrens = platform.getChildrenPlatforms();

  const onChange = (method) => {
    platform.distributionForm.setMethod(method);
  };

  const chooseDistributionOptions = [
    { value: 'steam_keys', text: 'Steam Keys' },
    { value: 'installer', text: 'Installer' },
  ];

  return (
    <div className="platform">
      <ChooseDistribution
        options={chooseDistributionOptions}
        selected={platform.distributionForm.method}
        onChange={onChange}
      />
      {platform.distributionForm.method === 'steam_keys' ? (
        <SteamKeys
          steamKeys={platform.distributionForm.steam_keys}
          add={platform.distributionForm.addKey}
          remove={platform.distributionForm.removeKey}
        />
      ) : (
        <Installers platforms={childrens} />
      )}
      {platform.uploadingInstallers() && <p>Installers are uploading</p>}
      {platform.distributionForm.errors.full_messages.length > 0 && (
        <Errors
          errors={platform.distributionForm.errors.full_messages.toJSON()}
        />
      )}
      <button
        disabled={platform.uploadingInstallers()}
        onClick={create}
        type="button"
        className="button is-link submit"
      >
        SAVE
      </button>
    </div>
  );
};

export default observer(PC);
