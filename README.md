[![Piral Logo](https://github.com/smapiot/piral/raw/develop/docs/assets/logo.png)](https://piral.io)

# [Piral Sample](https://piral.io) &middot; [![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/smapiot/piral/blob/main/LICENSE) [![Gitter Chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/piral-io/community)

> Piral Monorepo with a Shared Redux Store

:zap: Shows how redux can be used as a shared state container.

You can visit this demo at [mono-shared-redux.samples.piral.cloud/](https://mono-shared-redux.samples.piral.cloud/).

## Covered Functionality

The sample contains the following features:

- A monorepo managed by Lerna using Yarn workspaces
- One central Piral instance (`app-shell`)
- An integrated login page with a different layout (presented as a standalone page)
- A standard layout for the rest of the (authorized) app (e.g., in the dashboard view)
- Two pilets with their own respective stores using the `redux-dynamic-modules` package
- A shared layout (e.g., with a header)
- One centralized shared redux store with sagas (coming from `app-shell`)

## Installation

Clone the repository and use `lerna` to boostrap the dependencies:

```sh
npx lerna bootstrap
```

Then run `yarn start` to start all included microfrontends running in the shell.

## Useful Commands

You should operate the repository at the root level. There you can run commands such as

```sh
name=qxz yarn add:pilet
```

to add new pilets (e.g., named `qxz-pilet`). You can also upgrade pilets with

```sh
name=foo yarn upgrade:pilet
```

where the convention is again that you don't need to type in the `-pilet` suffix. You can also upgrade all pilets in one sweep:

```sh
yarn upgrade:pilets
```

The previously mentioned command `yarn start` is just an alias for

```sh
yarn watch:all
```

which will place all pilets into a watch mode working against the current version of the app shell.

To build the app shell you can just run

```sh
yarn build:portal
```

or, to build everything `yarn build:all`. This will call the `build:portal` command and run

```sh
yarn build:pilets
```

You can also build a single pilet using

```sh
name=foo yarn build:pilet
```

where the `foo-pilet` package would be build.

## License

Piral and this sample code is released using the MIT license. For more information see the [license file](./LICENSE).
