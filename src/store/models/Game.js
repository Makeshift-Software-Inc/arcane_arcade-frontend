import { types, getParent } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";

const Game = types
  .model("Game", {
    id: types.identifier,
    title: types.string,
    description: types.string,
    price: types.string,
    images: types.array(types.string),
    videos: types.array(types.string),
  })
  .actions((self) => ({
    play() {
      const { selectGame } = getParent(self, 2);
      selectGame(self);
    },
  }));

export default types.compose(BaseUpdate, Game);
