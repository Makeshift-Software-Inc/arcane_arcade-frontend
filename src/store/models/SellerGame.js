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
import Image from './Image';
import Video from './Video';

const SellerGame = types
  .model('SellerGame', {
    id: types.identifier,
    status: types.enumeration(['pending', 'active', 'rejected']),
    slug: types.string,
    title: types.string,
    description: types.string,
    price: types.number,
    images: types.array(Image),
    videos: types.array(Video),
    preorderable: types.boolean,
    early_access: types.boolean,
    esrb: types.string,
    btc_amount: types.number,
    xmr_amount: types.number,
    default_currency: types.string,
    currency_symbol: types.string,
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
    get defaultImage() {
      return self.images[0];
    },
    active() {
      return self.status === 'active';
    },
    pending() {
      return self.status === 'pending';
    },
    distributionsSet() {
      const pcPlatform = self.supported_platform_listings.find(
        (platform) => platform.supported_platform.name === 'PC',
      );
      const otherPlatforms = self.supported_platform_listings.filter(
        (platform) => !['PC', 'WINDOWS', 'MAC', 'LINUX'].includes(
          platform.supported_platform.name,
        ),
      );
      if (!pcPlatform || pcPlatform.distribution) {
        return otherPlatforms.every((p) => p.distribution);
      }

      return (
        pcPlatform.getChildrenPlatforms().every((p) => p.distribution)
        && otherPlatforms.every((p) => p.distribution)
      );
    },
    groupedSupportedPlatforms() {
      return self.supported_platform_listings.filter((platform) => ['PC', 'XB1', 'PS4', 'SWITCH'].includes(
        platform.supported_platform.name,
      ));
    },
  }))
  .actions(() => ({}));

export default types.compose(BaseUpdate, SellerGame);
