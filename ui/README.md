# Ping Dapp
This repository contains a Dapp example which will be connected to smart contracts and assets.


**Sections**
- [Install](#Install)
- [Scripts](#Run-script-application)
- [Stack](#Stack)
- [Hooks](#Hooks-available)

## Install:

```bash
# Recommended!
yarn

# Npm!
npm install

```

## Run script application

```bash
# local with server on testing
yarn start:final # to start the final dapp
yarn start:practice # to start the practice dapp

# Builds
yarn build:final
yarn build:practice

```

## Stack:

This packages are used in this project.

- Builder: **Vite**
- Core: **Javascript**
- CSS framework: **Tailwind**
- JS version: **ES6**
- Lint: **es-lint**

## Hooks available:
- **pre-commit**: trigger yarn lint-staged to Lint check, code formatter and test when code is committed


## Discussions:

You are welcome to discuss scripts in this repository with issues, but consider that everybody can contribute to the repo, but not obliged to respond to opened issues.