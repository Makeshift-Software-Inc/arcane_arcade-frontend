import { types, getParent } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';

const Video = types
  .model('Video', {
    original: types.string,
    transcoded: types.maybeNull(types.string),
    screenshot: types.maybeNull(types.string),
  })
  .views((self) => ({
    get video() {
      return self.transcoded || self.original;
    },
    get thumbnail() {
      if (self.screenshot) return self.screenshot;
      const game = getParent(self, 2);
      return game.defaultImage.largeImage;
    },
  }));

export default types.compose(BaseUpdate, Video);
