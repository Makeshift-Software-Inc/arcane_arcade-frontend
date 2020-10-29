import React from 'react';

import Select from '../Select/Select';

import windowsIcon from '../../../../../img/platform_icons/WINDOWS_blue.svg';
import macIcon from '../../../../../img/platform_icons/MAC_blue.svg';
import xb1Icon from '../../../../../img/platform_icons/XB1_blue.svg';
import linuxIcon from '../../../../../img/platform_icons/linux_blue.svg';
import switchIcon from '../../../../../img/platform_icons/SWITCH_blue.svg';
import ps4Icon from '../../../../../img/platform_icons/PS4_blue.svg';

const ICONS = {
  WINDOWS: windowsIcon,
  MAC: macIcon,
  LINUX: linuxIcon,
  SWITCH: switchIcon,
  PS4: ps4Icon,
  XB1: xb1Icon,
};

const Platform = ({ platform, availablePlatforms, update }) => {
  const options = availablePlatforms.map((name) => ({
    value: name,
    icon: ICONS[name],
  }));

  const onChange = (e) => {
    update({ platform: e.target.value });
  };

  return (
    <Select
      options={options}
      selected={platform}
      onChange={onChange}
      name="platform"
    />
  );
};

export default Platform;
