import { types, flow, getRoot } from 'mobx-state-tree';
import Base from './Base';
import Errors from './Errors';

import SupportedPlatform from '../models/SupportedPlatform';
import SupportedLanguages from '../models/SupportedLanguages';
import Category from '../models/Category';
import Tag from '../models/Tag';
import SystemRequirements from '../models/SystemRequirements';
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
    categories: types.array(types.reference(Category)),
    supported_platforms: types.array(types.reference(SupportedPlatform)),
    tags: types.array(types.reference(Tag)),
    early_access: false,
    price: types.maybe(types.number),
    errors: types.optional(Errors, {}),
    loading: false,
    system_requirements: types.array(SystemRequirements),
    files: types.array(UploadedFile),
    attachments: types.array(UploadedFile),
    saved_files: types.array(types.reference(SavedFile)),
    release_date: types.optional(types.string, ''),
    supported_languages: types.optional(SupportedLanguages, {}),
    preorderable: false,
    loaded: false,
  })
  .views((self) => ({
    allFilesUploaded() {
      const filesUploaded = self.files.every((file) => file.uploaded);
      if (!filesUploaded) return false;

      const attachmentsUploaded = self.attachments.every(
        (file) => file.uploaded,
      );
      if (!attachmentsUploaded) return false;

      return true;
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
      return self.supported_platforms.filter(
        (platform) => !doNotInclude.includes(platform.name),
      );
    },
    releaseDateInFuture() {
      if (self.release_date.length === 0) return false;
      return new Date(self.release_date) > new Date();
    },
  }))
  .actions((self) => ({
    load: flow(function* load() {
      // already loaded
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
      self.categories = game.categories.toJSON();
      self.supported_platforms = game.supported_platforms.toJSON();
      self.tags = game.tags.toJSON();
      self.early_access = game.early_access;
      self.price = game.price;
      self.system_requirements = game.system_requirements;
      self.saved_files = game.saved_files.map((file) => file.id);
      self.release_date = game.release_date;
      self.preorderable = game.preorderable;

      self.loading = false;
    }),
    addSupportedPlatform(id, name) {
      self.supported_platforms.push(id);
      if (self.allowedSystemRequirementsFields().includes(name)) {
        self.system_requirements.push({ platform: name });
      }
    },
    removeSupportedPlatform(id, name) {
      self.supported_platforms = self.supported_platforms.filter(
        (platform) => id !== platform.id,
      );
      if (name === 'PC') {
        self.supported_platforms = self.supported_platforms.filter(
          (platform) => !self.allowedSystemRequirementsFields().includes(platform.name),
        );
      }
      if (self.allowedSystemRequirementsFields().includes(name)) {
        self.system_requirements = self.system_requirements.filter(
          (systemRequirement) => systemRequirement.platform !== name,
        );
      } else if (name === 'PC') {
        self.system_requirements = self.system_requirements.filter(
          (systemRequirement) => !self
            .allowedSystemRequirementsFields()
            .includes(systemRequirement.platform),
        );
      }
    },
    addCategory(category) {
      self.categories.push(category.id);
      self.categoryOptions
        .find((c) => c.id === category.id)
        .update({ disabled: true });
    },
    removeCategory(index) {
      if (index < 0) return;
      const category = self.categories[index];
      self.categories = self.categories.filter((c) => c.id !== category.id);
      self.categoryOptions
        .find((c) => c.id === category.id)
        .update({ disabled: false });
    },
    addFile(file) {
      // if there is a file with a same name, don't add it again
      if (self.files.find((f) => f.name === file.name)) return;

      self.files.push({
        name: file.name,
        type: file.type,
        size: file.size,
        data: file,
        url: URL.createObjectURL(file),
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

      const items = self.files.toJSON();
      const [removed] = items.splice(oldIndex, 1);
      items.splice(newIndex, 0, removed);
      self.files = items;
    },
    addTag(tag) {
      self.tags.push(tag);
      self.tagsOptions.find((t) => t.id === tag.id).update({ disabled: true });
    },
    removeTag(index) {
      if (index < 0) return;
      const tag = self.tags[index];
      self.tags = self.tags.filter((t) => t.id !== tag.id);
      self.tagsOptions.find((t) => t.id === tag.id).update({ disabled: false });
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
    validate: () => true,
  }));

export default types.compose(Base, ListingForm);
