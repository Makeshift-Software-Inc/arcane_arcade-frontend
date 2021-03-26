import {
  types, flow, getRoot, destroy,
} from 'mobx-state-tree';
import Base from './Base';

import SupportedPlatform from '../models/SupportedPlatform';
import SupportedPlatformListing from '../models/SupportedPlatformListing';
import SupportedLanguages from '../models/SupportedLanguages';
import Category from '../models/Category';
import CategoryListing from '../models/CategoryListing';
import Tag from '../models/Tag';
import ListingTag from '../models/ListingTag';
import UploadedFile from '../models/UploadedFile';
import SavedFile from '../models/SavedFile';

import Api from '../../services/Api';
import deserialize from '../../utils/deserialize';

const ListingForm = types
  .model('ListingForm', {
    supportedPlatformOptions: types.array(SupportedPlatform),
    categoryOptions: types.array(Category),
    tagsOptions: types.array(Tag),
    title: types.optional(types.string, ''),
    esrb: types.optional(
      types.enumeration(['EVERYONE', 'E_TEN_PLUS', 'TEEN', 'MATURE', 'ADULT']),
      'EVERYONE',
    ),
    description: types.optional(types.string, ''),
    category_listings: types.array(CategoryListing),
    supported_platform_listings: types.array(SupportedPlatformListing),
    listing_tags: types.array(ListingTag),
    early_access: false,
    price: types.maybe(types.number),
    loading: false,
    files: types.array(UploadedFile),
    attachments: types.array(UploadedFile),
    saved_files: types.array(types.reference(SavedFile)),
    release_date: types.optional(types.string, ''),
    supported_languages: types.optional(SupportedLanguages, {}),
    preorderable: false,
    loaded: false,
    isUpdate: false,
  })
  .views((self) => ({
    keysForValidation() {
      return [
        'title',
        'categories',
        'uploader',
        'description',
        'supportedPlatforms',
        'price',
        'releaseDate',
        'audioLanguages',
        'textLanguages',
        'systemRequirements',
      ];
    },
    titleValidation() {
      if (self.title.trim().length === 0) {
        return ['Please write the title of your game'];
      }
      return false;
    },
    categoriesValidation() {
      if (self.categories().length === 0) {
        return ['Please select at least one category'];
      }
      return false;
    },
    uploaderValidation() {
      if (
        self.visibleImages().length === 0
        || self.visibleVideos().length === 0
      ) {
        return ['Please upload at least one video and one picture'];
      }
      return false;
    },
    descriptionValidation() {
      if (self.description.trim().length === 0) {
        return ['Please write game description'];
      }
      return false;
    },
    supportedPlatformsValidation() {
      const choosedPlatforms = self
        .supportedPlatforms()
        .filter((platform) => platform.name !== 'PC');
      if (choosedPlatforms.length === 0) {
        return ['Please select at least one platform'];
      }
      return false;
    },
    priceValidation() {
      if (!self.price || self.price === 0) {
        return ['Please enter the game price'];
      }
      return false;
    },
    releaseDateValidation() {
      if (self.release_date.trim().length === 0) {
        return ['Please select the release date'];
      }
      return false;
    },
    audioLanguagesValidation() {
      if (self.supported_languages.audio.length === 0) {
        return ['Please choose at least one language'];
      }
      return false;
    },
    textLanguagesValidation() {
      if (self.supported_languages.text.length === 0) {
        return ['Please choose at least one language'];
      }
      return false;
    },
    systemRequirementsValidation() {
      const allSet = self.systemRequirements().every((requirement) => {
        const values = requirement.keysToSend().minimum;
        return Object.keys(values).every(
          (key) => values[key] && values[key].trim().length > 0,
        );
      });

      if (!allSet) {
        return [
          'Please fill in all the fields for minimum requirements for all platforms.',
        ];
      }

      return false;
    },
    categoryListingsKeys() {
      return self.category_listings.map((category_listing) => ({
        id: category_listing.id,
        _destroy: category_listing._destroy,
        category_id: category_listing.category.id,
      }));
    },
    listingTagsKeys() {
      return self.listing_tags.map((listing_tag) => ({
        id: listing_tag.id,
        _destroy: listing_tag._destroy,
        tag_id: listing_tag.tag.id,
      }));
    },
    supportedPlatformListingsKeys() {
      return self.supported_platform_listings.map(
        (supported_platform_listing) => ({
          id: supported_platform_listing.id,
          _destroy: supported_platform_listing._destroy,
          supported_platform_id:
            supported_platform_listing.supported_platform.id,
          system_requirements: supported_platform_listing.system_requirements,
        }),
      );
    },
    supportedLanguagesKeys() {
      return {
        audio: self.supported_languages.audio,
        text: self.supported_languages.text,
      };
    },
    allFilesUploaded() {
      const filesUploaded = self.files.every((file) => file.uploaded);
      if (!filesUploaded) return false;

      const attachmentsUploaded = self.attachments.every(
        (file) => file.uploaded,
      );
      if (!attachmentsUploaded) return false;

      return true;
    },
    categories() {
      return self.category_listings.filter(
        (category_listing) => !category_listing._destroy,
      );
    },
    tags() {
      return self.listing_tags.filter((listing_tag) => !listing_tag._destroy);
    },
    supportedPlatforms() {
      return self.supported_platform_listings
        .filter(
          (supported_platform_listing) => !supported_platform_listing._destroy,
        )
        .map(
          (supported_platform_listing) => supported_platform_listing.supported_platform,
        );
    },
    systemRequirements() {
      return self.supported_platform_listings
        .filter(
          (supported_platform_listing) => !supported_platform_listing._destroy,
        )
        .map(
          (supported_platform_listing) => supported_platform_listing.system_requirements,
        )
        .filter((system_requirement) => !!system_requirement);
    },
    allFiles() {
      return self.files.concat(self.saved_files);
    },
    visibleFiles() {
      return self.files.concat(
        self.saved_files.filter((file) => !file._destroy),
      );
    },
    visibleImages() {
      return self
        .visibleFiles()
        .filter((file) => file.type.startsWith('image'));
    },
    visibleVideos() {
      return self
        .visibleFiles()
        .filter((file) => file.type.startsWith('video'));
    },
    filesSorted() {
      return self
        .visibleFiles()
        .sort((a, b) => (a.position > b.position ? 1 : -1));
    },
    savedImages() {
      return self.saved_files.filter((file) => file.type.startsWith('image'));
    },
    savedVideos() {
      return self.saved_files.filter((file) => file.type.startsWith('video'));
    },
    images() {
      return self.files.filter((file) => file.type.startsWith('image'));
    },
    videos() {
      return self.files.filter((file) => file.type.startsWith('video'));
    },
    allowedSystemRequirementsFields() {
      return ['WINDOWS', 'MAC', 'LINUX'];
    },
    systemRequirementsFields() {
      const doNotInclude = ['PC', 'XB1', 'SWITCH', 'PS4'];
      return self
        .supportedPlatforms()
        .filter((platform) => !doNotInclude.includes(platform.name));
    },
    releaseDateInFuture() {
      if (self.release_date.length === 0) return false;
      return new Date(self.release_date) > new Date();
    },
    nextPosition() {
      const allFiles = self.visibleFiles();
      if (allFiles.length > 0) {
        return (
          // eslint-disable-next-line
          Math.max.apply(
            Math,
            self.allFiles().map((file) => file.position),
          ) + 1
        );
      }
      return 0;
    },
  }))
  .actions((self) => ({
    load: flow(function* load() {
      // already loaded
      self.resetEdit();
      if (self.loaded) return true;

      self.loading = true;

      try {
        const response = yield Api.get('/listings/new');
        self.supportedPlatformOptions = deserialize(
          response.data.supported_platforms,
        );
        self.categoryOptions = deserialize(response.data.categories);
        self.tagsOptions = deserialize(response.data.tags);
        self.loaded = true;
        self.loading = false;
        return true;
      } catch (e) {
        console.log(e);
        self.loading = false;
        return false;
      }
    }),
    resetEdit() {
      self.title = '';
      self.description = '';
      self.esrb = 'EVERYONE';
      self.category_listings = [];
      self.supported_platform_listings = [];
      self.listing_tags = [];
      self.early_access = false;
      self.price = undefined;
      self.supported_languages = SupportedLanguages.create({});
      self.saved_files = [];
      self.release_date = '';
      self.preorderable = false;
      self.files = [];
      self.errors = {};
      self.isUpdate = false;
    },
    prepareEdit: flow(function* prepareEdit(slug) {
      self.loading = true;
      const {
        auth: {
          user: {
            seller: { games, gamesLoaded, loadGames },
          },
        },
      } = getRoot(self);

      if (!gamesLoaded) yield loadGames();

      const game = games.find((g) => g.slug === slug);

      self.title = game.title;
      self.description = game.description;
      self.esrb = game.esrb;
      // eslint-disable-next-line
      self.category_listings = game.category_listings.map((category_listing) => category_listing.toJSON(),);
      self.supported_platform_listings = game.supported_platform_listings.map(
        (supported_platform_listing) => supported_platform_listing.toJSON(),
      );
      self.listing_tags = game.listing_tags.map((listing_tag) => listing_tag.toJSON());
      self.supported_languages = game.supported_languages.toJSON();
      self.early_access = game.early_access;
      self.price = game.price;
      self.saved_files = game.saved_files.map((file) => file.id);
      self.release_date = game.release_date;
      self.preorderable = game.preorderable;
      self.files = [];
      self.errors = {};
      self.isUpdate = true;

      self.loading = false;
    }),
    updateGame: flow(function* updateGame(slug, data) {
      self.loading = true;

      try {
        const response = yield Api.put(`/listings/${slug}`, { listing: data });
        console.log(response.data);
        const {
          auth: {
            user: {
              seller: { games },
            },
          },
        } = getRoot(self);

        const game = games.find((g) => g.slug === slug);
        game.update(deserialize(response.data));
        self.resetEdit();
        self.loading = false;
        return true;
      } catch (e) {
        if (e.response && e.response.data) {
          self.errors.update(e.response.data);
        }
        console.log('LISTING UPDATE ERROR', e);
        self.loading = false;
        return false;
      }
    }),
    addSupportedPlatform(id, name) {
      if (self.isUpdate) {
        const supported_platform_listing = self.supported_platform_listings.find(
          (s) => id === s.supported_platform.id,
        );
        if (supported_platform_listing) {
          supported_platform_listing.update({ _destroy: false });
          if (name === 'PC') {
            self.supported_platform_listings
              .filter((s) => self
                .allowedSystemRequirementsFields()
                .includes(s.supported_platform.name))
              .forEach((s) => s.update({ _destroy: false }));
          }
          return;
        }
      }
      let system_requirements = null;
      if (self.allowedSystemRequirementsFields().includes(name)) {
        system_requirements = { platform: name };
      }
      self.supported_platform_listings.push({
        supported_platform: id,
        system_requirements,
      });
    },
    removeSupportedPlatform(id, name) {
      if (self.isUpdate) {
        const supported_platform_listing = self.supported_platform_listings.find(
          (s) => id === s.supported_platform.id,
        );
        if (supported_platform_listing && !!supported_platform_listing.id) {
          supported_platform_listing.update({ _destroy: true });
          if (name === 'PC') {
            self.supported_platform_listings
              .filter((s) => self
                .allowedSystemRequirementsFields()
                .includes(s.supported_platform.name))
              .forEach((s) => s.update({ _destroy: true }));
          }
          return;
        }
      }
      self.supported_platform_listings = self.supported_platform_listings.filter(
        (supported_platform_listing) => id !== supported_platform_listing.supported_platform.id,
      );
      if (name === 'PC') {
        self.supported_platform_listings = self.supported_platform_listings.filter(
          (supported_platform_listing) => !self
            .allowedSystemRequirementsFields()
            .includes(supported_platform_listing.supported_platform.name),
        );
      }
    },
    addCategory(category) {
      if (self.isUpdate) {
        const category_listing = self.category_listings.find(
          (c) => c.category.id === category.id,
        );
        if (category_listing) {
          category_listing.update({ _destroy: false });
          self.categoryOptions
            .find((c) => c.id === category.id)
            .update({ disabled: true });
          return;
        }
      }
      self.category_listings.push({ category: category.id });
      self.categoryOptions
        .find((c) => c.id === category.id)
        .update({ disabled: true });
    },
    removeCategory(index) {
      if (index < 0) return;
      const category_id = self.categories()[index].category.id;
      if (self.isUpdate) {
        const category_listing = self.category_listings.find(
          (c) => c.category.id === category_id,
        );
        if (category_listing) {
          category_listing.update({ _destroy: true });
          self.categoryOptions
            .find((c) => c.id === category_id)
            .update({ disabled: false });
          return;
        }
      }
      self.category_listings = self.category_listings.filter(
        (c) => c.category.id !== category_id,
      );
      self.categoryOptions
        .find((c) => c.id === category_id)
        .update({ disabled: false });
    },
    addFile(file) {
      // if there is a file with a same name, don't add it again
      if (self.files.find((f) => f.name === file.name)) return;

      const position = self.nextPosition();

      console.log(position);

      self.files.push({
        name: file.name,
        type: file.type,
        size: file.size,
        data: file,
        url: URL.createObjectURL(file),
        position,
      });
    },
    addAttachment: flow(function* addAttachment(event) {
      const {
        attachment,
        attachment: { file },
      } = event;

      const uploadedFile = UploadedFile.create({
        name: file.name,
        type: file.type,
        size: file.size,
        data: file,
        url: URL.createObjectURL(file),
        attachment,
        autoupload: false,
      });

      self.attachments.push(uploadedFile);
      try {
        if (yield uploadedFile.upload()) {
          return {
            url: uploadedFile.awsUrl,
            href: `${uploadedFile.awsUrl}?content-disposition=attachment`,
          };
        }
        return false;
      } catch (e) {
        console.log(e);
        return false;
      }
    }),
    reorderFiles(oldIndex, newIndex) {
      if (oldIndex === newIndex) return;

      const allFiles = self.filesSorted();

      const [removed] = allFiles.splice(oldIndex, 1);
      allFiles.splice(newIndex, 0, removed);
      self.repositionFiles(allFiles);
    },
    repositionFiles(filesToSort = null) {
      const files = filesToSort || self.filesSorted();
      files.forEach((file, position) => {
        file.update({ position });
      });
    },
    addTag(tag) {
      if (self.isUpdate) {
        const listing_tag = self.listing_tags.find((c) => c.tag.id === tag.id);
        if (listing_tag) {
          listing_tag.update({ _destroy: false });
          self.tagsOptions
            .find((c) => c.id === tag.id)
            .update({ disabled: true });
          return;
        }
      }
      self.listing_tags.push({ tag: tag.id });
      self.tagsOptions.find((c) => c.id === tag.id).update({ disabled: true });
    },
    removeTag(index) {
      if (index < 0) return;
      const tag_id = self.tags()[index].tag.id;
      if (self.isUpdate) {
        const listing_tag = self.listing_tags.find((c) => c.tag.id === tag_id);
        if (listing_tag) {
          listing_tag.update({ _destroy: true });
          self.tagsOptions
            .find((c) => c.id === tag_id)
            .update({ disabled: false });
          return;
        }
      }
      self.listing_tags = self.listing_tags.filter((c) => c.tag.id !== tag_id);
      self.tagsOptions.find((c) => c.id === tag_id).update({ disabled: false });
    },
    setReleaseDate(date) {
      if (date) {
        self.release_date = date.toUTCString();
        if (!self.releaseDateInFuture()) {
          self.preorderable = false;
        }
      } else {
        self.release_date = '';
        self.preorderable = false;
      }
    },
    setPreorderable(value) {
      self.preorderable = value;
    },
    setPrice(e) {
      self.price = parseFloat(e.target.value);
    },
    destroyFile(file) {
      destroy(file);
      self.repositionFiles();
    },
  }));

export default types.compose(Base, ListingForm);
