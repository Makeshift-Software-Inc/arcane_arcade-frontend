import { types } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";

const UploadedFile = types
  .model("UploadedFile", {
    name: types.string,
    type: types.string,
    size: types.number,
    url: types.string,
    data: types.frozen(),
    isDragged: false,
  })
  .actions((self) => ({
    setDragging(value) {
      self.isDragged = value;
    },
  }));

export default types.compose(BaseUpdate, UploadedFile);
