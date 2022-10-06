import Web3Lib from 'web3';
import { TransactionType } from '../constants';
import { ProxyEvents } from '../utils';

let dexContract;
let pingContract;
const web3 = new Web3Lib(Web3Lib.givenProvider);
const proxyEvents = ProxyEvents();

function initialize(dex, ping) {
  dexContract = new web3.eth.Contract(dex.abi, dex.address);
  dexContract.events.allEvents((...args) => console.log('dex-log', ...args));

  pingContract = new web3.eth.Contract(ping.abi, ping.address);
  pingContract.events.allEvents((...args) => console.log('ping-log', ...args));
}

async function getAccounts() {
  const accounts = await web3.eth.getAccounts();

  return accounts;
}

async function connect() {
  return await web3.eth.requestAccounts();
}

async function swapEthToToken(value, options) {
  const weiValue = web3.utils.toWei(value, 'ether');
  await proxyEvents.process(
    dexContract.methods.ethToToken().send({ ...options, value: weiValue }),
    TransactionType.EthToToken
  );
}

async function swapTokenToEth(value, options) {
  const weiValue = web3.utils.toWei(value, 'ether');
  const dexAddress = dexContract.options.address;
  const allowance = await pingContract.methods.allowance(options.from, dexAddress).call();

  if (parseFloat(allowance) < value) {
    await proxyEvents.process(
      pingContract.methods.approve(dexAddress, weiValue).send(options),
      TransactionType.TokenToEthApprove
    );
  }

  await proxyEvents.process(dexContract.methods.tokenToEth(weiValue).send(options), TransactionType.TokenToEth);
}

async function swap(asset, value, options) {
  return asset === 'eth' ? swapEthToToken(value, options) : swapTokenToEth(value, options);
}

async function addLiquidity(value = 1, options) {
  // Add add liquidity code HERE
}

export default {
  addLiquidity,
  connect,
  initialize,
  getAccounts,
  swap,
  ...proxyEvents,
};
