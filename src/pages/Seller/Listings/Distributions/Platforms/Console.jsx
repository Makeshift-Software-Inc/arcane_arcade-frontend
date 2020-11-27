import React from 'react';
import { observer } from 'mobx-react';

import Errors from '../../../../../components/Errors/Errors';

import ChooseDistribution from './ChooseDistribution';
import SteamKeys from './SteamKeys';

const Console = ({ distribution, create }) => (
  <div className="platform">
    <ChooseDistribution
      options={[{ value: 'steam_keys', text: 'Steam Keys' }]}
      selected="steam_keys"
      onChange={() => {}}
    />

    <SteamKeys
      steamKeys={distribution.steam_keys}
      add={distribution.addKey}
      remove={distribution.removeKey}
    />
    {distribution.errors.full_messages.length > 0 && (
      <Errors errors={distribution.errors.full_messages.toJSON()} />
    )}
    <button onClick={create} type="button" className="button is-link submit">
      SAVE
    </button>
  </div>
);

export default observer(Console);
