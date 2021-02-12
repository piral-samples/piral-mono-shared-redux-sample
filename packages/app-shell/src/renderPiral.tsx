import "piral/polyfills";
import { renderInstance } from "piral";
import { layout, errors } from "./layout";
import { store, actions } from "./store";

// change to your feed URL here (either using feed.piral.cloud or your own service)
const feedUrl = "https://feed.piral.cloud/api/v1/pilet/empty";

renderInstance({
    plugins: [
        // @ts-ignore
        (context) => (api, target) => ({
            globalStore: store,
            globalStoreActions: actions,
        }),
    ],
    layout,
    errors,
    requestPilets() {
        return fetch(feedUrl)
            .then((res) => res.json())
            .then((res) => res.items);
    },
});
