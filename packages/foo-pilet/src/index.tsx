import * as React from "react";
import { Link } from "react-router-dom";
import { PiletApi } from "app-shell";

const Foo = React.lazy(() => import("./fooPage"));

export function setup(app: PiletApi) {
  app.showNotification("Hello from Foo!", {
    autoClose: 2000,
    type: "warning",
  });

  app.registerTile(
    () => (
      <div className="teaser">
        <Link to="/foo">Foo Page</Link>
      </div>
    ),
    {
      initialColumns: 2,
      initialRows: 2,
    }
  );

  app.registerPage("/foo", () => (
    <Foo store={app.globalStore} actions={app.globalStoreActions} />
  ));
}
