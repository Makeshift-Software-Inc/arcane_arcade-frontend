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
      // don't load again if games are loaded
      if (self.games.length > 0) return;

      self.loading = true;

      try {
        const response = yield Api.get("/listings");
        const games = deserialize(response.data);
        self.games = games;
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
