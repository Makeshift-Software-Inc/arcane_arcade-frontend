import { types, getParent } from 'mobx-state-tree';

const Requirement = types
  .model('Requirement', {
    os: types.optional(types.string, ''),
    processor: types.optional(types.string, ''),
    memory: types.optional(types.string, ''),
    graphics: types.optional(types.string, ''),
    storage: types.optional(types.string, ''),
    directX: types.optional(types.string, ''),
  })
  .views((self) => ({
    keys() {
      const keys = ['os', 'processor', 'memory', 'graphics', 'storage'];
      const { platform } = getParent(self);

      if (platform === 'WINDOWS') {
        return [...keys, 'directX'];
      }

      return keys;
    },
    keysToSend() {
      const object = {};
      self.keys().forEach((key) => {
        object[key] = self[key];
      });
      return object;
    },
  }))
  .actions((self) => ({
    onChange(e) {
      self[e.target.name] = e.target.value;
    },
  }));

const SystemRequirements = types
  .model('SystemRequirements', {
    platform: types.optional(types.string, ''),
    minimum: types.optional(Requirement, {}),
    recommended: types.optional(Requirement, {}),
    additional_notes: types.optional(types.string, ''),
  })
  .views((self) => ({
    keysToSend() {
      return {
        minimum: self.minimum.keysToSend(),
        recommended: self.recommended.keysToSend(),
        additional_notes: self.additional_notes,
      };
    },
  }))
  .actions((self) => ({
    onChange(e) {
      self[e.target.name] = e.target.value;
    },
  }));

export default SystemRequirements;
