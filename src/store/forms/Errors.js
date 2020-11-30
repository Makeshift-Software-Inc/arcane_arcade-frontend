import { types } from 'mobx-state-tree';

const Error = types.model('Error', {
  key: types.string,
  messages: types.array(types.string),
});

const Errors = types
  .model('Errors', {
    errors: types.array(Error),
    full_messages: types.array(types.string),
  })
  .views((self) => ({
    hasError(key) {
      return !!self.getError(key);
    },
    hasErrors() {
      return (
        Object.keys(self.errors).length > 0 || self.full_messages.length > 0
      );
    },
    getError(key) {
      return self.errors.find((error) => error.key === key);
    },
    getErrors(key) {
      return self.getError(key).messages.join(', ');
    },
  }))
  .actions((self) => ({
    reset() {
      self.errors = [];
      self.full_messages = [];
    },
    update: (data) => {
      Object.keys(data).forEach((key) => {
        self[key] = data[key];
      });
    },
    addError(key, message) {
      if (self.hasError(key)) {
        self.getError(key).messages.push(message);
        return;
      }
      self.errors.push({ key, messages: [message] });
    },
    addFullMessageError(error) {
      self.full_messages.push(error);
    },
  }));

export default Errors;
