import React from "react";
import { useLocalStore } from "mobx-react";
import { types } from "mobx-state-tree";

import AuthStore from "./AuthStore";
import FormsStore from "./FormsStore";

let store;

const RootStore = types.model("Root", {
  auth: types.optional(AuthStore, {}),
  forms: types.optional(FormsStore, {}),
});

const initStore = (initialState) => {
  if (store) return store;

  store = RootStore.create(initialState);
  return store;
};

const storeContext = React.createContext();

export const StoreProvider = ({ children }) => {
  const localStore = useLocalStore(initStore);
  return (
    <storeContext.Provider value={localStore}>{children}</storeContext.Provider>
  );
};

export const useStore = (namespace) => {
  const localStore = React.useContext(storeContext);
  if (!localStore) {
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return namespace ? localStore[namespace] : localStore;
};