import { types, flow, getRoot } from "mobx-state-tree";
import Game from "./models/Game";

import Api from "../services/Api";

import deserialize from "../utils/deserialize";

const GamesStore = types
  .model("GamesStore", {
    games: types.array(Game),
    selectedGame: types.maybe(types.reference(Game)),
    loading: false,
    creating: false,
  })
  .actions((self) => ({
    load: flow(function* load(query = null) {
      // don't load again if games are loaded
      if (self.games.length > 0) return;

      self.loading = true;

      try {
        let response = {};
        if (!query) {
          response = yield Api.get("/listings");
        } else {
          response = yield Api.get(`/listings?q=${query}`);
        }

        self.games = deserialize(response.data);
        self.loading = false;
        return true;
      } catch (e) {
        console.log(e);
        self.loading = false;
        return false;
      }
    }),
    create: flow(function* create(data) {
      self.creating = true;

      try {
        const response = yield Api.post("/listings", { listing: data });

        const {
          auth: {
            user: { seller },
          },
        } = getRoot(self);

        const game = deserialize(response.data);
        console.log(game);

        seller.addGame(game);
        self.creating = false;
        return game.id;
      } catch (e) {
        console.log(e);
        const { forms } = getRoot(self);
        self.loading = false;
        if (e.response && e.response.data) {
          forms.listing.errors.update(e.response.data);
        }
        self.creating = false;
        return false;
      }
    }),
    selectGame(game) {
      self.selectedGame = game;
    },
  }));

export default GamesStore;
