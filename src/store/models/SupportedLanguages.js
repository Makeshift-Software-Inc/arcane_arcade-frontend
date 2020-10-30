import { types } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';

const Language = types.model('Language', {
  name: types.string,
});

const SupportedLanguages = types
  .model('SupportedLanguages', {
    audio: types.array(Language),
    text: types.array(Language),
  })
  .views(() => ({
    suggestions() {
      return [{ name: 'English' }, { name: 'Spanish' }];
    },
  }))
  .actions((self) => ({
    addAudio(language) {
      self.audio.push(language);
    },
    removeAudio(index) {
      if (index < 0) return;
      const language = self.audio[index];
      self.audio = self.audio.filter((c) => c.name !== language.name);
    },
    addText(language) {
      self.text.push(language);
    },
    removeText(index) {
      if (index < 0) return;
      const language = self.text[index];
      self.text = self.text.filter((c) => c.name !== language.name);
    },
  }));

export default types.compose(BaseUpdate, SupportedLanguages);
