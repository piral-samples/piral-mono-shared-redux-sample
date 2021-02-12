import "piral/polyfills";
import * as React from "react";
import { render } from "react-dom";

const style = {
    display: "grid",
    height: "70vh",
    justifyContent: "center",
    alignContent: "center",
    gap: "20px",
};

const Piral = React.lazy(() => import("./renderPiral"));

const App = () => {
    const [user, setUser] = React.useState<any>();

    if (user) {
        console.log("returning Piral");

        return (
            <React.Suspense fallback={<div>Loading...</div>}>
                <Piral />
            </React.Suspense>
        );
    }

    return (
        <div {...{ style }}>
            <div>
                <div>name</div>
                <input></input>
            </div>
            <div>
                <div>password</div>
                <input type="password"></input>
            </div>

            <button onClick={() => setUser({})}>login</button>
        </div>
    );
};

render(<App />, document.getElementById("app"));
