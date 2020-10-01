import { types } from "mobx-state-tree";

const BaseUpdate = types.model().actions((self) => ({
  update: (data) => {
    Object.keys(data).forEach((key) => {
      self[key] = data[key];
    });
  },
}));

export default BaseUpdate;
