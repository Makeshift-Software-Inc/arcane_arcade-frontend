import { types, getRoot } from 'mobx-state-tree';
import Base from './Base';

const DEFAULT_RANGE = [0, 60];

const Price = types
  .model('Price', {
    min: types.optional(types.number, DEFAULT_RANGE[0]),
    max: types.optional(types.number, DEFAULT_RANGE[1]),
  })
  .views((self) => ({
    values() {
      return [self.min, self.max];
    },
    defaultRange() {
      return DEFAULT_RANGE;
    },
  }))
  .actions((self) => ({
    setValues(values) {
      const [min, max] = values;
      self.min = min;
      self.max = max;
    },
  }));

const SORT_BY_OPTIONS = {
  relevance: 'Relevance',
  release_date: 'Release Date',
  name: 'Name',
  price_asc: 'Lowest Price',
  price_desc: 'Highest Price',
  reviews: 'User Reviews',
};

const PLATFORM_OPTIONS = {
  ALL: 'All',
  WINDOWS: 'Windows',
  LINUX: 'Linux',
  MAC: 'Mac',
  XB1: 'Xbox 1',
  PS4: 'PS4',
  SWITCH: 'Switch',
};

const Search = types
  .model('Search', {
    sort_by: types.optional(
      types.enumeration(Object.keys(SORT_BY_OPTIONS)),
      'relevance',
    ),
    platform: types.optional(
      types.enumeration(Object.keys(PLATFORM_OPTIONS)),
      'ALL',
    ),
    genre: types.optional(types.string, 'ALL'),
    query: types.optional(types.string, ''),
    price: types.optional(Price, {}),
  })
  .views((self) => ({
    sortByOptions() {
      return SORT_BY_OPTIONS;
    },
    platformOptions() {
      return PLATFORM_OPTIONS;
    },
    genreOptions() {
      const {
        forms: { listing },
      } = getRoot(self);
      return ['ALL'].concat(
        listing.categoryOptions.map((category) => category.title),
      );
    },
    toParams() {
      const params = {};
      if (self.query.trim().length > 0) {
        params.query = self.query.trim();
      }
      if (
        self.price.min > DEFAULT_RANGE[0]
        || self.price.max < DEFAULT_RANGE[1]
      ) {
        params.price_min = self.price.min;
        params.price_max = self.price.max;
      }
      if (self.genre !== 'ALL') {
        params.genre = self.genre;
      }
      if (self.platform !== 'ALL') {
        params.platform = self.platform;
      }
      if (self.sort_by !== 'relevance') {
        params.sort_by = self.sort_by;
      }
      return params;
    },
  }))
  .actions((self) => ({
    setSearchParameters(field, value) {
      console.log(self[field], value, field);
      self[field] = value;
      console.log(self[field]);
    },
  }));

export default types.compose(Base, Search);
