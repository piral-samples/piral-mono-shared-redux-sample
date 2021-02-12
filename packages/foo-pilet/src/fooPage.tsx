import * as React from "react";
import { Provider, connect } from "react-redux";

const Foo = ({ actions, store }) => {
    const ConnectedApp = connect(({ url }) => ({ url }), actions)(App);

    return (
        <Provider {...{ store }}>
            <ConnectedApp />
        </Provider>
    );
};

const App = ({ fetchDog, url }) => {
    return (
        <div>
            <button onClick={fetchDog}>fetch dog</button>
            <img src={url || ""} />
        </div>
    );
};

export default Foo;
