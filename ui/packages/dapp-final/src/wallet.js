import PingArtifact from './config/artifacts/ping-contract';

const { erc20, dex, gas } = PingArtifact;

let accounts = null;
let provider = null;

function initialize(lib) {
  provider = lib;
  provider.initialize(dex, erc20);
}

function on(...rest) {
  return provider.on(...rest);
}

function off(...rest) {
  return provider.off(...rest);
}

function dispatch(...rest) {
  return provider.dispatch(...rest);
}

async function swap(asset, amount) {
  try {
    return await provider.swap(asset, amount, { from: getAddress(), gas });
  } catch {
    return;
  }
}

// Get if metamask is connected with dApp
async function getAccounts() {
  if (hasWalletInstalled()) {
    try {
      accounts = await provider.getAccounts();
    } catch (error) {
      console.log(error);
    }
  }
}

async function connect() {
  if (hasWalletInstalled()) {
    try {
      accounts = await provider.connect();
    } catch (error) {
      console.log(error);
    }
  }

  return accounts;
}

function getAddress(index = 0) {
  return accounts[index];
}

function hasWalletInstalled() {
  return Boolean(window.ethereum);
}

export function disconnect() {
  accounts = null;
}

export function isConnected() {
  return Boolean(accounts && accounts.length);
}

async function addLiquidity(value) {
  try {
    return provider.addLiquidity(value, { from: getAddress(), gas });
  } catch {
    return;
  }
}

export default {
  addLiquidity,
  connect,
  dispatch,
  getAddress,
  getAccounts,
  hasWalletInstalled,
  initialize,
  isConnected,
  off,
  on,
  swap,
};
