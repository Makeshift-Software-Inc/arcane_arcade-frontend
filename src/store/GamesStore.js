import { types, flow, getRoot } from 'mobx-state-tree';
import Game from './models/Game';

import Api from '../services/Api';

import deserialize from '../utils/deserialize';

const GamesStore = types
  .model('GamesStore', {
    games: types.array(Game),
    selectedGame: types.maybe(types.reference(Game)),
    loading: false,
    creating: false,
    gamesLoaded: false,
    searching: false,
    searched: false,
    searchResults: types.array(Game),
  })
  .actions((self) => ({
    search: flow(function* search() {
      if (self.searching) return true;

      self.searching = true;
      self.searched = true;

      const {
        forms: { search: searchForm },
      } = getRoot(self);

      const params = searchForm.toParams();

      console.log(params);

      try {
        const response = yield Api.get('/listings', { params });
        self.searchResults = deserialize(response.data);
        self.searching = false;
        return true;
      } catch (e) {
        console.log(e);
        self.searching = false;
        return false;
      }
    }),
    load: flow(function* load() {
      // don't load again if games are loaded
      if (self.gamesLoaded) return true;

      self.loading = true;

      try {
        const response = yield Api.get('/listings');
        self.games = deserialize(response.data);
        self.loading = false;
        self.gamesLoaded = true;
        return true;
      } catch (e) {
        console.log(e);
        self.loading = false;
        self.gamesLoaded = false;
        return false;
      }
    }),
    create: flow(function* create(data) {
      self.creating = true;

      try {
        const response = yield Api.post('/listings', { listing: data });

        const {
          auth: {
            user: { seller },
          },
        } = getRoot(self);

        const game = deserialize(response.data);

        seller.addGame(game);
        self.creating = false;
        return game.id;
      } catch (e) {
        const { forms } = getRoot(self);
        self.loading = false;
        if (e.response && e.response.data) {
          forms.listing.errors.update(e.response.data);
        }
        self.creating = false;
        return false;
      }
    }),
    loadGame: flow(function* loadGame(slug) {
      const existingGame = self.games.find((game) => game.slug === slug);

      if (existingGame) {
        self.selectedGame = existingGame;
        return true;
      }

      try {
        const response = yield Api.get(`/listings/${slug}`);
        const game = Game.create(deserialize(response.data));
        self.games.push(game);
        self.selectedGame = game;
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }),
    selectGame(game) {
      self.selectedGame = game;
    },
  }));

export default GamesStore;
