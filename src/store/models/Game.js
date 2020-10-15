import { types, getParent } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';
import Seller from './Seller';
import SupportedPlatformListing from './SupportedPlatformListing';

const Game = types
  .model('Game', {
    id: types.identifier,
    slug: types.string,
    title: types.string,
    description: types.string,
    price: types.number,
    images: types.array(types.string),
    videos: types.array(types.string),
    preorderable: types.boolean,
    early_access: types.boolean,
    esrb: types.string,
    btc_amount: types.number,
    xmr_amount: types.number,
    accepts_bitcoin: types.boolean,
    accepts_monero: types.boolean,
    default_currency: types.string,
    currency_symbol: types.string,
    seller: types.maybe(Seller),
    status: types.enumeration(['pending', 'active']),
    supported_platform_listings: types.array(SupportedPlatformListing),
    release_date: types.string,
  })
  .views((self) => ({
    supportedPlatforms() {
      return self.supported_platform_listings.map(
        (platform) => platform.supported_platform
      );
    },
    supportedPlatformsToBuy() {
      return self.supported_platform_listings.filter(
        (platform) => platform.distribution
      );
    },
    hasSupportedPlatform(name) {
      return !!self
        .supportedPlatforms()
        .find((platform) => platform.name === name);
    },
  }))
  .actions((self) => ({
    play() {
      const { selectGame } = getParent(self, 2);
      selectGame(self);
    },
  }));

export default types.compose(BaseUpdate, Game);
