# React scaffolding

An opinionated scaffolding with the following technical stack and configuration:
* nodejs v4.2.x
* npm v3.8.x
* React  (15.x)
* React Router (2.x)
* Flux by using Redux (3.x)
* Webpack
* CSS Modules
* SASS
* Seamless Immutable
* Hot module replacement
* Babel
* Testing mocha + shallow rendering with React

The idea is to provide a base structure that enables consumers to esaily start building features and deliver a production ready package of a Single Page App.

## NOTE
This Scaffolding is based on React, Redux and Webpack. It also provides a simple Node server. Be sure you are already familiar with these technologies before using it.

## Getting started
To start hacking simply do:
```
$ npm install
$ npm start
```
Point browser to http://localhost:3000. This will set up the dev mode.
## What comes in

This scaffolding includes a basic folder structure and webpack configuration to set up a develompent environment. The `dev` environment uses a node server similar to the `webpack-dev-server` to serve the assets and to allow for hot reloading.
It also includes a webpack configuration to bundle assets for a production environment and a Node server to serve those files.

As per the app structure itself, it provides a React+Redux application already set up, wit basic routing, stores, reducers and containers defined.

## Requirements
The scaffolding was developed using `NodeJS` v4.2 and `npm` v3.8.
## Scripts

There are a couple of scripts included. Run them using `npm run <name-of-the-script>`:

* `start`: starts the app in dev mode using the dev configuration.
* `build`: generates the webpack bundle using the prod configuration, ready to be served.
* `clean`: removes the asset files generated in the webpack bundle so that they can be rebuilt.
* `start-prod`: builds the webpack prod bundle and then starts the node server using it. It points to http://localhost:9898

## Rationale behind the stack

Check the resources [section](https://github.com/dtaborda/reddit/wiki) for talks and explanations on WHY the stack we present here.

### Bundle process

The scaffolding provides a feature-rich configuration for delivering the application as well as a rich development experience.
Go [here](./WEBPACK.md) to read more about the details of our bundle process.

## TO DO

- [ ] Better examples of styling and way of sharing styles between css modules and js
- [ ] Test examples for unit test with shallow rendering.
