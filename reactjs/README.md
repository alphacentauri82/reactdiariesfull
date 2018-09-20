# Yarn installation

```bash
$ brew install yarn
```

[yarn documentation](https://yarnpkg.com/lang/en/docs/install/)

# Frontend architecture

An opinionated architecture with the following technical stack and configuration:

* nodejs v6.x
* yarn
* next.js v2.3.x
* react v15.5.x
* react-intl v2.3.x
* redux v3.6.x
* material-ui v0.18.x
* styled-components v1.4.x
* eslint v3.8.x
* eslint-config-airbnb v12.x


The idea is to provide a base structure that enables consumers to esaily start building features and deliver a production ready package of a Single Page App.

## NOTE
This architecture is based on nextjs framework. It also provides a simple Node server. Be sure you are already familiar with these technologies before using it.

## Getting started
To start hacking simply do:

### Installation

```bash
$ yarn install
```

### Run developer mode

```bash
$ yarn dev
```
Point browser to http://localhost:3000. This will set up the dev mode.

### Run production mode

```bash
$ yarn build
$ yarn start
```
Point browser to http://localhost:3000. This will set up the dev mode.
