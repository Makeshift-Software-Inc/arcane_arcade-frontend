import { types, getParent } from 'mobx-state-tree';
import Base from './Base';
import Errors from './Errors';
import UploadedFile from '../models/UploadedFile';

const DistributionForm = types
  .model('DistributionForm', {
    method: types.optional(
      types.enumeration(['steam_keys', 'installer']),
      'steam_keys',
    ),
    steam_keys: types.array(types.string),
    installer: types.maybe(UploadedFile),
    errors: types.optional(Errors, {}),
  })
  .actions((self) => ({
    addKey(key) {
      self.steam_keys.push(key);
    },
    removeKey(key) {
      self.steam_keys = self.steam_keys.filter((k) => k !== key);
    },
    setMethod(method) {
      self.method = method;
      self.errors = {};
    },
    addInstaller(file) {
      self.installer = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        data: file,
        secure: true,
      };
    },
    validate: () => {
      self.errors = {};

      const supportedPlatformListing = getParent(self);
      const PCsupportedPlatformListings = getParent(
        self,
        2,
      ).filter((platform) => ['WINDOWS', 'MAC', 'LINUX'].includes(platform.supported_platform.name));

      if (supportedPlatformListing.supported_platform.name === 'PC') {
        if (self.method === 'steam_keys') {
          if (self.steam_keys.length < 50) {
            self.errors.update({
              full_messages: ['You must add at least 50 steam keys.'],
            });
            return false;
          }
        }
        if (self.method === 'installer') {
          if (
            !PCsupportedPlatformListings.every(
              (platform) => !!platform.distributionForm.installer,
            )
          ) {
            PCsupportedPlatformListings.forEach((platform) => {
              if (!platform.distributionForm.installer) {
                self.errors.addFullMessageError(
                  `Please upload installer for ${platform.supported_platform.name}`,
                );
              }
            });
            return false;
          }
        }
      } else {
        if (self.method === 'steam_keys') {
          if (self.steam_keys.length < 50) {
            self.errors.update({
              full_messages: ['You must add at least 50 steam keys.'],
            });
            return false;
          }
        }
        if (self.method === 'installer') {
          if (!self.installer) {
            self.errors.update({
              full_messages: ['Please upload the installer.'],
            });
            return false;
          }
        }
      }
      return true;
    },
  }));

export default types.compose(Base, DistributionForm);
