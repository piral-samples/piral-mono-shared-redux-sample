import * as React from "react";
import { connect, Provider } from "react-redux";
import { GlobalStore, SharedActions, SharedStore } from "app-shell";

interface AppProps {
  fetchDog(): void;
  url: string;
}

const App: React.FC<AppProps> = ({ fetchDog, url }) => {
  return (
    <div>
      <button onClick={fetchDog}>fetch dog</button>
      <img src={url || ""} />
    </div>
  );
};

export interface FooProps {
  store: SharedStore;
  actions: SharedActions;
}

const Foo: React.FC<FooProps> = ({ actions, store }) => {
  const ConnectedApp = connect(
    ({ dogs }: GlobalStore) => ({ url: dogs.url }),
    actions
  )(App);

  return (
    <Provider store={store as any}>
      <ConnectedApp />
    </Provider>
  );
};

export default Foo;
