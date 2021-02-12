import * as React from "react";
import { PiletApi } from "app-shell";

export function setup(app: PiletApi) {
  app.showNotification("Hello from Bar!", {
    autoClose: 2000,
  });

  app.registerTile(() => <div className="teaser">Bar here!</div>, {
    initialColumns: 2,
    initialRows: 2,
  });
}
