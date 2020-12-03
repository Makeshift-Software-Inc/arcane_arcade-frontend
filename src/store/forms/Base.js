import { types } from 'mobx-state-tree';
import Errors from './Errors';

const VALIDATION_ERRORS = {
  blank: "can't be blank",
  invalidEmail: 'is not a valid email',
  numbersOnly: 'can contain only numbers',
  minlength: ({ length }) => `must have ${length} characters minimum`,
  confirmation: ({ field }) => `doesn't match ${field}`,
  between: ({ min, max }) => `must be between ${min} to ${max} characters`,
};

const Base = types
  .model({
    errors: types.optional(Errors, {}),
  })
  .views((self) => ({
    keys: (keysToSend) => {
      const object = {};
      keysToSend.forEach((key) => {
        object[key] = self[key];
      });
      return object;
    },
    validationError(key, args = {}) {
      if (typeof VALIDATION_ERRORS[key] === 'function') {
        return VALIDATION_ERRORS[key](args);
      }
      return VALIDATION_ERRORS[key];
    },
    getErrors(key) {
      return self.errors.getErrors(key);
    },
    hasError(key) {
      return self.errors.hasError(key);
    },
    hasErrors() {
      return self.errors.hasErrors();
    },
  }))
  .actions((self) => ({
    validate: () => {
      self.resetErrors();
      if (!self.keysForValidation) {
        return true;
      }
      const keys = self.keysForValidation();

      keys.forEach((key) => {
        const errors = self[`${key}Validation`]();
        if (errors && errors.length > 0) {
          errors.forEach((error) => {
            self.addError(key, error);
          });
        }
      });

      return !self.hasErrors();
    },
    resetErrors() {
      self.errors.reset();
    },
    addError(key, message) {
      self.errors.addError(key, message);
    },
    onChange: (event) => {
      if (Object.prototype.hasOwnProperty.call(self, event.target.name)) {
        self[event.target.name] = event.target.value;
      } else {
        throw new Error(
          `There is no ${event.target.name} field in ${self.$treenode.type.name} form model.`,
        );
      }
    },
    update: (data) => {
      Object.keys(data).forEach((key) => {
        self[key] = data[key];
      });
    },
  }));

export default Base;
