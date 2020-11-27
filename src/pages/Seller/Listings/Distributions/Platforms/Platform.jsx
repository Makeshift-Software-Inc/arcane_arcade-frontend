import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import Loading from '../../../../../components/Loading/Loading';

import PC from './PC';
import Console from './Console';

const Platform = ({ platform, selected }) => {
  useEffect(() => {
    platform.distributionForm.prepare();
  }, []);

  if (platform.creatingDistribution) return <Loading />;

  if (!selected) return null;

  const create = async () => {
    if (platform.distributionForm.validate()) {
      if (platform.distributionForm.action === 'create') {
        await platform.createDistribution();
      } else {
        await platform.updateDistribution();
      }
    }
  };

  if (platform.supported_platform.name === 'PC') {
    return <PC platform={platform} create={create} />;
  }

  return <Console distribution={platform.distributionForm} create={create} />;
};

export default observer(Platform);
