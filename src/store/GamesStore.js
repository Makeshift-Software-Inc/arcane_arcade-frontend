import { types, flow } from "mobx-state-tree";
import Game from "./models/Game";

import Api from "../services/Api";

import deserialize from "../utils/deserialize";

const GamesStore = types
  .model("GamesStore", {
    games: types.array(Game),
    selectedGame: types.maybe(types.reference(Game)),
    loading: false,
  })
  .actions((self) => ({
    load: flow(function* load() {
      self.loading = true;

      try {
        const response = yield Api.get("/listings");
        self.games = deserialize(response.data.data);
        self.loading = false;
        return true;
      } catch (e) {
        console.log(e);
        self.loading = false;
        return false;
      }
    }),
    selectGame(game) {
      self.selectedGame = game;
    },
  }));

export default GamesStore;
