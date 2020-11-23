import { types, flow, getRoot } from 'mobx-state-tree';
import Game from './models/Game';

import Api from '../services/Api';

import deserialize from '../utils/deserialize';

const GamesStore = types
  .model('GamesStore', {
    games: types.array(Game),
    selectedGame: types.maybe(Game),
    loading: false,
    creating: false,
    gamesLoaded: false,
    searching: false,
    searched: false,
    searchResults: types.array(Game),
  })
  .views((self) => ({
    featuredGames() {
      return self.games.filter((game) => game.featured);
    },
    promotedGames() {
      return self.games.filter((game) => game.promoted);
    },
    newReleases() {
      return self.games.filter((game) => !game.featured && !game.promoted);
    },
    availableGames() {
      return self.games.concat(self.searchResults);
    },
  }))
  .actions((self) => ({
    search: flow(function* search(query) {
      if (self.searching && !query) return true;

      self.searching = true;
      self.searched = true;

      let params = { search: true };

      if (query) {
        params.query = query;
      } else {
        const {
          forms: { search: searchForm },
        } = getRoot(self);

        params = { ...params, ...searchForm.toParams() };
      }

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
        self.selectedGame = { ...existingGame.toJSON() };
        return true;
      }

      try {
        const response = yield Api.get(`/listings/${slug}`);
        const game = Game.create(deserialize(response.data));
        self.games.push(game);
        self.selectedGame = { ...game.toJSON() };
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }),
    selectGame(gameOrId) {
      if (!gameOrId) {
        self.selectedGame = undefined;
        return;
      }
      if (typeof gameOrId === 'string') {
        const game = self.availableGames().find((g) => g.id === gameOrId);
        if (game) {
          self.selectedGame = {
            ...game.toJSON(),
          };
        }
      } else {
        self.selectedGame = { ...gameOrId.toJSON() };
      }
    },
  }));

export default GamesStore;
