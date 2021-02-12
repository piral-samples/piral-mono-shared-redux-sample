import * as React from "react";
import { Link } from "react-router-dom";
import { PiletApi } from "app-shell";

const Foo = React.lazy(() => import("./fooPage"));

export function setup(app: PiletApi) {
    app.showNotification("Hello from Piral!", {
        autoClose: 2000,
    });

    app.registerTile(
        () => (
            <div>
                <Link to="/foo">Take me to foo</Link>
            </div>
        ),
        {
            initialColumns: 2,
            initialRows: 2,
        }
    );

    app.registerPage("/foo", () => (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Foo {...{ store: app.globalStore, actions: app.globalStoreActions }} />
        </React.Suspense>
    ));

    console.log("foo", { app });
}
