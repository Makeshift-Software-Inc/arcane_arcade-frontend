import { types } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';

const LANGUAGES = [
  'English',
  'Spanish',
  'German',
  'Polish',
  'Russian',
  'Japanese',
  'Chinese',
];

const Language = types.model('Language', {
  name: types.string,
});

const Suggestion = types.model('Suggestion', {
  name: types.string,
  disabled: false,
});

const SupportedLanguages = types
  .model('SupportedLanguages', {
    audio: types.array(Language),
    text: types.array(Language),
    audioSuggestions: types.array(Suggestion),
    textSuggestions: types.array(Suggestion),
  })
  .views(() => ({}))
  .actions((self) => ({
    afterCreate() {
      self.audioSuggestions = LANGUAGES.map((name) => ({ name }));
      self.textSuggestions = LANGUAGES.map((name) => ({ name }));
    },
    addAudio(language) {
      language.disabled = true;
      const name = language.name.trim();
      if (
        !self.audio.find(
          (audio) => audio.name.toLowerCase() === name.toLowerCase(),
        )
      ) {
        self.audio.push({ name });
      }
    },
    removeAudio(index) {
      if (index < 0) return;
      const { name } = self.audio[index];

      self.audio = self.audio.filter((c) => c.name !== name);
      const suggestion = self.audioSuggestions.find(
        (lang) => lang.name === name,
      );
      if (suggestion) suggestion.disabled = false;
    },
    addText(language) {
      language.disabled = true;
      const name = language.name.trim();
      if (
        !self.text.find(
          (text) => text.name.toLowerCase() === name.toLowerCase(),
        )
      ) {
        self.text.push({ name });
      }
    },
    removeText(index) {
      if (index < 0) return;
      const { name } = self.text[index];
      self.text = self.text.filter((c) => c.name !== name);
      const suggestion = self.textSuggestions.find(
        (lang) => lang.name === name,
      );
      if (suggestion) suggestion.disabled = false;
    },
  }));

export default types.compose(BaseUpdate, SupportedLanguages);
