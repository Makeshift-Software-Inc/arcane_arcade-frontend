import { types, flow, getRoot } from "mobx-state-tree";
import Api from "../services/Api";

import deserialize from "../utils/deserialize";

import Notification from "./models/Notification";

const NotificationsStore = types
  .model("NotificationsStore", {
    data: types.array(Notification),
    loading: false,
  })
  .views((self) => ({
    notSeen() {
      return self.data.filter((notification) => !notification.seen);
    },
  }))
  .actions((self) => ({
    load: flow(function* load() {
      const { auth } = getRoot(self);
      if (!auth.isLoggedIn) return false;

      self.loading = true;

      try {
        const response = yield Api.get("/notifications");
        const notifications = deserialize(response.data);
        self.data = notifications;
        self.loading = false;
        return true;
      } catch (e) {
        console.log(e);
        self.loading = false;
        return false;
      }
    }),
  }));

export default NotificationsStore;
