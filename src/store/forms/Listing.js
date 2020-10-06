import { types, flow } from "mobx-state-tree";
import Base from "./Base";
import Errors from "./Errors";

import SupportedPlatform from "../models/SupportedPlatform";
import Category from "../models/Category";
import Tag from "../models/Tag";
import SystemRequirements from "../models/SystemRequirements";
import UploadedFile from "../models/UploadedFile";

import Api from "../../services/Api";
import deserialize from "../../utils/deserialize";

const ListingForm = types
  .model("ListingForm", {
    supportedPlatformOptions: types.array(SupportedPlatform),
    categoryOptions: types.array(Category),
    tagsOptions: types.array(Tag),
    title: types.optional(types.string, ""),
    esrb: types.optional(
      types.enumeration(["EVERYONE", "E_TEN_PLUS", "TEEN", "MATURE", "ADULT"]),
      "EVERYONE"
    ),
    description: types.optional(types.string, ""),
    selected_categories: types.array(types.reference(Category)),
    supported_platforms: types.array(types.reference(SupportedPlatform)),
    tags: types.array(types.reference(Tag)),
    earlyAccess: false,
    price: types.optional(types.string, ""),
    errors: types.optional(Errors, {}),
    loading: false,
    system_requirements: types.array(SystemRequirements),
    files: types.array(UploadedFile),
    attachments: types.array(UploadedFile),
    errors: types.optional(Errors, {}),
  })
  .views((self) => ({
    images() {
      return self.files.filter((file) => file.type.startsWith("image"));
    },
    videos() {
      return self.files.filter((file) => file.type.startsWith("video"));
    },
    allowedSystemRequirementsFields() {
      return ["WINDOWS", "MAC", "LINUX"];
    },
    systemRequirementsFields() {
      const doNotInclude = ["PC", "XB1", "SWITCH", "PS4"];
      return self.supported_platforms.filter(
        (platform) => !doNotInclude.includes(platform.name)
      );
    },
  }))
  .actions((self) => ({
    load: flow(function* load() {
      // already loaded
      if (
        self.supportedPlatformOptions.length > 0 &&
        self.categoryOptions.length > 0 &&
        self.tagsOptions.length > 0
      )
        return;

      self.loading = true;

      try {
        const response = yield Api.get("/listings/new");
        self.supportedPlatformOptions = deserialize(
          response.data.supported_platforms
        );
        self.categoryOptions = deserialize(response.data.categories);
        self.tagsOptions = deserialize(response.data.tags);
        self.loading = false;
        return true;
      } catch (e) {
        console.log(e);
        self.loading = false;
        return false;
      }
    }),
    addSupportedPlatform(id, name) {
      self.supported_platforms.push(id);
      if (self.allowedSystemRequirementsFields().includes(name)) {
        self.system_requirements.push({ name, description: "" });
      }
    },
    removeSupportedPlatform(id, name) {
      self.supported_platforms = self.supported_platforms.filter(
        (platform) => id !== platform.id
      );
      if (self.allowedSystemRequirementsFields().includes(name)) {
        self.system_requirements = self.system_requirements.filter(
          (systemRequirement) => systemRequirement.name !== name
        );
      }
    },
    addCategory(category) {
      self.selected_categories.push(category.id);
      self.categoryOptions
        .find((c) => c.id === category.id)
        .update({ disabled: true });
    },
    removeCategory(index) {
      const category = self.selected_categories[index];
      self.selected_categories = self.selected_categories.filter(
        (c) => c.id !== category.id
      );
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
      });

      self.attachments.push(uploadedFile);
      try {
        if (yield uploadedFile.upload()) {
          return {
            url: uploadedFile.awsUrl,
            href: uploadedFile.awsUrl + "?content-disposition=attachment",
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
      const tag = self.tags[index];
      self.tags = self.tags.filter((t) => t.id !== tag.id);
      self.tagsOptions.find((t) => t.id === tag.id).update({ disabled: false });
    },
    validate: () => {
      // TODO: Validate here (check ./SignUp for details)
      return true;
    },
  }));

export default types.compose(Base, ListingForm);
