import { types, flow, getRoot } from 'mobx-state-tree';
import { toast } from 'react-toastify';
import moment from 'moment';
import BaseUpdate from './BaseUpdate';
import SellerGame from './SellerGame';
import DestinationAddresses from './DestinationAddresses';
import Order from './Order';

import Api from '../../services/Api';
import deserialize from '../../utils/deserialize';

const Seller = types
  .model('Seller', {
    id: types.identifier,
    status: types.enumeration(['pending', 'active', 'rejected']),
    accepted_crypto: types.array(types.string),
    destination_addresses: types.maybeNull(DestinationAddresses, {}),
    business_name: types.string,
    default_currency: types.string,
    studio_size: types.string,
    games: types.array(SellerGame),
    gamesLoaded: false,
    loadingGames: false,
    selectedGame: types.maybe(types.reference(SellerGame)),
    addingDestinationAddresses: false,
    statsLoaded: false,
    loadingStats: false,
    recentOrders: types.array(Order),
    selectedRecentOrder: types.maybe(types.reference(Order)),
    stats: types.frozen(),
    updating: false,
  })
  .views((self) => ({
    activeGames() {
      return self.games.filter((game) => game.active());
    },
    pendingGames() {
      return self.games.filter((game) => game.pending());
    },
    statsDataFor(chartOption) {
      switch (chartOption) {
        case 'Daily':
          return Object.values(self.stats.daily);
        case 'Weekly':
          return Object.values(self.stats.weekly);
        case 'Monthly':
          return Object.values(self.stats.monthly);
        case 'Yearly':
          return Object.values(self.stats.yearly);
        default:
          return [];
      }
    },
    statsLabelsFor(chartOption) {
      switch (chartOption) {
        case 'Daily':
          return Object.keys(self.stats.daily).map((time) => moment(time).format('ddd'));
        case 'Weekly':
          return Object.keys(self.stats.weekly).map((time) => moment(time).format('Wo'));
        case 'Monthly':
          return Object.keys(self.stats.monthly).map((time) => moment(time).format('MMM'));
        case 'Yearly':
          return Object.keys(self.stats.yearly).map((time) => moment(time).format('MMM'));
        default:
          return [];
      }
    },
  }))
  .actions((self) => ({
    loadStats: flow(function* loadStats() {
      if (self.statsLoaded) return true;

      self.loadingStats = true;

      try {
        const response = yield Api.get('/sellers/stats');
        self.recentOrders = deserialize(response.data.orders);
        self.stats = response.data.stats;
        self.statsLoaded = true;
        self.loadingStats = false;
        return true;
      } catch (e) {
        console.log(e);
        self.loadingStats = false;
        return false;
      }
    }),
    loadGames: flow(function* loadGames() {
      if (self.gamesLoaded) return true;

      self.loadingGames = true;

      try {
        const response = yield Api.get('/listings/seller_listings');
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
    addDestinationAddresses: flow(function* addDestinationAddresses(seller) {
      self.addingDestinationAddresses = true;

      try {
        const response = yield Api.put('/sellers/destination_addresses', {
          seller,
        });
        self.update(deserialize(response.data));
        self.addingDestinationAddresses = false;
        return true;
      } catch (e) {
        console.log(e);
        self.addingDestinationAddresses = false;
        return false;
      }
    }),
    handleStatusUpdate: flow(function* handleStatusUpdate(event) {
      self.updating = true;

      try {
        yield Api.put(`/admins/sellers/${self.id}`, {
          seller: { status: event.target.value },
        });
        const {
          admin: { pendingSellers },
        } = getRoot(self);
        pendingSellers.removeSeller(self);
        return true;
      } catch (e) {
        console.log(e);
        if (e.response && e.response.data) {
          toast(e.response.data.full_messages.join('. '));
        }
        self.updating = false;
        return false;
      }
    }),
    selectGame(id) {
      self.selectedGame = self.games.find((game) => game.id === id);
    },
    addGame(game) {
      self.games.push(game);
    },
    setSelectedRecentOrder(id) {
      self.selectedRecentOrder = id;
    },
  }));

export default types.compose(BaseUpdate, Seller);
