import { types, flow } from "mobx-state-tree";
import BaseUpdate from "./BaseUpdate";
import SellerGame from "./SellerGame";

import Api from "../../services/Api";
import deserialize from "../../utils/deserialize";

const Seller = types
  .model("Seller", {
    id: types.identifier,
    accepted_crypto: types.array(types.string),
    business_name: types.string,
    default_currency: types.string,
    studio_size: types.string,
    games: types.array(SellerGame),
    gamesLoaded: false,
    loadingGames: false,
    selectedGame: types.maybe(types.reference(SellerGame)),
  })
  .views((self) => ({
    activeGames() {
      return self.games.filter((game) => game.active());
    },
    pendingGames() {
      return self.games.filter((game) => game.pending());
    },
  }))
  .actions((self) => ({
    loadGames: flow(function* loadGames() {
      if (self.gamesLoaded) return true;

      self.loadingGames = true;

      try {
        const response = yield Api.get("/listings/seller_listings");
        self.games = deserialize(response.data);
        self.gamesLoaded = true;
        self.loadingGames = false;
        return true;
      } catch (e) {
        console.log(e);
        self.loadingGames = false;
        return false;
      }
    }),
    selectGame(id) {
      self.selectedGame = self.games.find((game) => game.id === id);
    },
    addGame(game) {
      self.games.push(game);
    },
  }));

export default types.compose(BaseUpdate, Seller);
