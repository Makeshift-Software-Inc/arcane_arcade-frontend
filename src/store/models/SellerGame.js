import { types } from 'mobx-state-tree';
import BaseUpdate from './BaseUpdate';
import SupportedPlatform from './SupportedPlatform';
import SupportedPlatformListing from './SupportedPlatformListing';
import SupportedLanguages from './SupportedLanguages';
import Category from './Category';
import CategoryListing from './CategoryListing';
import Tag from './Tag';
import ListingTag from './ListingTag';
import SavedFile from './SavedFile';

const SellerGame = types
  .model('SellerGame', {
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
    default_currency: types.string,
    currency_symbol: types.string,
    status: types.enumeration(['pending', 'active', 'rejected']),
    supported_platforms: types.array(types.reference(SupportedPlatform)),
    supported_platform_listings: types.array(SupportedPlatformListing),
    categories: types.array(types.reference(Category)),
    category_listings: types.array(CategoryListing),
    tags: types.array(types.reference(Tag)),
    listing_tags: types.array(ListingTag),
    release_date: types.string,
    saved_files: types.array(SavedFile),
    supported_languages: types.maybeNull(SupportedLanguages),
  })
  .views((self) => ({
    active() {
      return self.status === 'active';
    },
    pending() {
      return self.status === 'pending';
    },
    distributionsSet() {
      return self.supported_platform_listings
        .filter((platform) => platform.supported_platform.name !== 'PC')
        .every((p) => p.distribution);
    },
    groupedSupportedPlatforms() {
      return self.supported_platform_listings.filter((platform) => ['PC', 'XB1', 'PS4', 'SWITCH'].includes(
        platform.supported_platform.name,
      ));
    },
  }))
  .actions(() => ({}));

export default types.compose(BaseUpdate, SellerGame);
