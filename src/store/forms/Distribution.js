import { types } from "mobx-state-tree";
import Base from "./Base";
import Errors from "./Errors";
import UploadedFile from "../models/UploadedFile";

const DistributionForm = types
  .model("DistributionForm", {
    method: types.optional(
      types.enumeration(["steam_keys", "installer"]),
      "steam_keys"
    ),
    steam_keys: types.array(types.string),
    installer: types.maybe(UploadedFile),
    errors: types.optional(Errors, {}),
  })
  .actions((self) => ({
    addKey(key) {
      console.log("ADD KEY");
      self.steam_keys.push(key);
    },
    removeKey(key) {
      console.log("REMOVE KEY");
      self.steam_keys = self.steam_keys.filter((k) => k !== key);
    },
    setMethod(method) {
      console.log("SET METHOD", method);
      self.method = method;
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
      if (self.method === "steam_keys") {
        if (self.steam_keys.length < 50) {
          self.errors.update({
            full_messages: ["You must add at least 50 steam keys."],
          });
          return false;
        }
      }
      if (self.method === "installer") {
        if (!self.installer) {
          self.errors.update({
            full_messages: ["Please upload the installer."],
          });
          return false;
        }
      }
      return true;
    },
  }));

export default types.compose(Base, DistributionForm);
