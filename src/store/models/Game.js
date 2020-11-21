import {
  types, getParent, flow, getRoot,
} from 'mobx-state-tree';
import { toast } from 'react-toastify';

import BaseUpdate from './BaseUpdate';
import Seller from './Seller';
import SupportedPlatformListing from './SupportedPlatformListing';
import SupportedLanguages from './SupportedLanguages';
import Category from './Category';
import Tag from './Tag';
import Image from './Image';
import Video from './Video';

import Api from '../../services/Api';

const Game = types
  .model('Game', {
    id: types.string,
    status: types.enumeration(['pending', 'active', 'rejected']),
    slug: types.string,
    title: types.string,
    description: types.string,
    raw_description: types.string,
    price: types.number,
    images: types.array(Image),
    videos: types.array(Video),
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
    supported_platform_listings: types.array(SupportedPlatformListing),
    categories: types.array(types.reference(Category)),
    tags: types.array(types.reference(Tag)),
    release_date: types.string,
    featured: types.boolean,
    promoted: types.boolean,
    supported_languages: types.maybeNull(SupportedLanguages),
    updating: false,
  })
  .views((self) => ({
    get defaultImage() {
      return self.images[0];
    },
    supportedPlatforms() {
      return self.supported_platform_listings
        .filter((platform) => platform.supported_platform.name !== 'PC')
        .map((platform) => platform.supported_platform);
    },
    supportedPlatformsToBuy() {
      return self.supported_platform_listings.filter(
        (platform) => platform.distribution,
      );
    },
    hasSupportedPlatform(name) {
      return !!self
        .supportedPlatforms()
        .find((platform) => platform.name === name);
    },
    hasSystemRequirements() {
      return self.systemRequirements().length > 0;
    },
    systemRequirements() {
      return self.supported_platform_listings
        .filter((platform) => platform.system_requirements)
        .map((platform) => platform.system_requirements);
    },
    autocomplete() {
      return {
        image: self.images[0],
        title: self.title,
        price: `${self.price} USD`,
        link: `/games/${self.slug}`,
      };
    },
  }))
  .actions((self) => ({
    play() {
      const { selectGame } = getParent(self, 2);
      selectGame(self);
    },
    handleStatusUpdate: flow(function* handleStatusUpdate(event) {
      self.updating = true;

      try {
        yield Api.put(`/admins/listings/${self.id}`, {
          listing: { status: event.target.value },
        });
        const {
          admin: { pendingListings },
        } = getRoot(self);
        pendingListings.removeListing(self);
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
  }));

export default types.compose(BaseUpdate, Game);
