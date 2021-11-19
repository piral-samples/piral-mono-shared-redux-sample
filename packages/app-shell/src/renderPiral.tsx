import * as React from "react";
import {
  PiralPlugin,
  createInstance,
  Piral,
  createStandardApi,
  Dashboard,
} from "piral";
import { layout, errors } from "./layout";
import { store, actions } from "./store";

// change to your feed URL here (either using feed.piral.cloud or your own service)
const feedUrl = "https://feed.piral.cloud/api/v1/pilet/redux-sample";

declare module "piral-core/lib/types/custom" {
  interface PiletCustomApi extends StorePluginApi {}
}

type SharedStore = typeof store;
type SharedActions = typeof actions;

interface StorePluginApi {
  globalStore: SharedStore;
  globalStoreActions: SharedActions;
}

function createStorePlugin(): PiralPlugin<StorePluginApi> {
  return () => ({
    globalStore: store,
    globalStoreActions: actions,
  });
}

const instance = createInstance({
  plugins: [createStorePlugin(), ...createStandardApi()],
  state: {
    errorComponents: errors,
    components: layout,
    routes: {
      "/": Dashboard,
    },
  },
  requestPilets() {
    return fetch(feedUrl)
      .then((res) => res.json())
      .then((res) => res.items);
  },
});

export default () => <Piral instance={instance}></Piral>;
