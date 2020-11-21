import { types } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';
import Installer from './Installer';
import Image from './Image';

const OwnedGame = types
  .model('OwnedGame', {
    title: types.string,
    image: types.maybe(Image),
    platform: types.string,
    method: types.enumeration(['steam_keys', 'installer']),
    steam_key: types.maybeNull(types.string),
    installer_urls: types.maybeNull(types.array(Installer)),
  })
  .views((self) => ({
    methodName() {
      switch (self.method) {
        case 'steam_keys':
          return 'Steam Key';
        case 'installer':
          return 'Installers';
        default:
          return '';
      }
    },
    platformKey() {
      switch (self.method) {
        case 'steam_keys':
          return self.steam_key;
        case 'installer':
          return self.installer_urls;
        default:
          return '';
      }
    },
  }));

export default types.compose(BaseUpdate, OwnedGame);
