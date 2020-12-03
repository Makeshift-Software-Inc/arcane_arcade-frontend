import React from 'react';
import { observer } from 'mobx-react';

import Installer from './Installer';

const Installers = ({ platforms }) => platforms.map((platform) => (
  <Installer key={platform.id} platform={platform} />
));

export default observer(Installers);
