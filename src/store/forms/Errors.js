import { types } from 'mobx-state-tree';

const Errors = types
  .model('Errors', {
    errors: types.frozen(),
    full_messages: types.array(types.string),
  })
  .actions((self) => ({
    update: (data) => {
      Object.keys(data).forEach((key) => {
        self[key] = data[key];
      });
    },
    addFullMessageError(error) {
      self.full_messages.push(error);
    },
  }));

export default Errors;
