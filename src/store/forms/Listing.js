import { types, flow } from "mobx-state-tree";
import Base from "./Base";
import Errors from "./Errors";

import SupportedPlatform from "../models/SupportedPlatform";
import Category from "../models/Category";

import Api from "../../services/Api";
import deserialize from "../../utils/deserialize";

const ListingForm = types
  .model("ListingForm", {
    supportedPlatformOptions: types.array(SupportedPlatform),
    categoryOptions: types.array(Category),
    title: types.optional(types.string, ""),
    esrb: types.optional(
      types.enumeration(["EVERYONE", "E_TEN_PLUS", "TEEN", "MATURE", "ADULT"]),
      "EVERYONE"
    ),
    description: types.optional(types.string, ""),
    selected_category: types.maybe(types.reference(Category)),
    supported_platforms: types.array(types.reference(SupportedPlatform)),
    earlyAccess: false,
    price: types.optional(types.string, ""),
    errors: types.optional(Errors, {}),
    loading: false,
  })
  .views((self) => ({
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
        self.categoryOptions.length > 0
      )
        return;

      self.loading = true;

      try {
        const response = yield Api.get("/listings/new");
        self.supportedPlatformOptions = deserialize(
          response.data.supported_platforms
        );
        self.categoryOptions = deserialize(response.data.categories);
        self.loading = false;
        return true;
      } catch (e) {
        console.log(e);
        self.loading = false;
        return false;
      }
    }),
    addSupportedPlatform(id) {
      self.supported_platforms.push(id);
    },
    removeSupportedPlatform(id) {
      self.supported_platforms = self.supported_platforms.filter(
        (platform) => id !== platform.id
      );
    },
    selectCategory(title) {
      self.selected_category = self.categoryOptions.find(
        (category) => category.title === title
      );
    },
    validate: () => {
      // TODO: Validate here (check ./SignUp for details)
      return true;
    },
  }));

export default types.compose(Base, ListingForm);
