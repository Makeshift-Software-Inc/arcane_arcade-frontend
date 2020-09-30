import { types } from "mobx-state-tree";

const Base = types
  .model()
  .views((self) => ({
    keys: (keysToSend) => {
      const object = {};
      keysToSend.forEach((key) => {
        object[key] = self[key];
      });
      return object;
    },
  }))
  .actions((self) => ({
    onChange: (event) => {
      if (self.hasOwnProperty(event.target.name)) {
        self[event.target.name] = event.target.value;
      } else {
        throw new Error(
          `There is no ${event.target.name} field in ${self.$treenode.type.name} form model.`
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
