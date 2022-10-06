import { ethers } from 'ethers';
import { TransactionType } from '../constants';
import { ProxyEvents } from '../utils';

let dexContract;
let pingContract;
const library = new ethers.providers.Web3Provider(window.ethereum);
const proxyEvents = ProxyEvents();

function initialize(dex, ping) {
  const signer = library.getSigner();

  dexContract = new ethers.Contract(dex.address, dex.abi, signer);
  dexContract.on('*', (...rest) => {
    console.log('dex-log', rest);
  });

  pingContract = new ethers.Contract(ping.address, ping.abi, signer);
  pingContract.on('*', (...rest) => {
    console.log('ping-log', rest);
  });
}

async function getAccounts() {
  return await library.send('eth_accounts', []);
}

async function connect() {
  return await library.send('eth_requestAccounts', []);
}

async function swapEthToToken(value, { gas }) {
  const transaction = await proxyEvents.confirm(
    dexContract.ethToToken({ gasLimit: gas, value: ethers.utils.parseEther(value) }),
    TransactionType.EthToToken
  );
  await proxyEvents.process(transaction.wait(), TransactionType.EthToToken);
}

async function swapTokenToEth(value, { from, gas }) {
  const weiValue = ethers.utils.parseEther(value);
  const dexAddress = dexContract.address;
  const allowance = await pingContract.allowance(from, dexAddress);
  const allowanceNormalized = ethers.utils.formatEther(allowance);

  if (allowanceNormalized < value) {
    const approve = await proxyEvents.confirm(
      pingContract.approve(dexAddress, weiValue),
      TransactionType.TokenToEthApprove
    );
    await proxyEvents.process(approve.wait(), TransactionType.TokenToEthApprove);
  }

  const transaction = await proxyEvents.confirm(
    dexContract.tokenToEth(weiValue, { gasLimit: gas }),
    TransactionType.TokenToEth
  );
  await proxyEvents.process(transaction.wait(), TransactionType.TokenToEth);
}

async function swap(asset, value, options) {
  asset === 'eth' ? swapEthToToken(value, options) : swapTokenToEth(value, options);
}

async function addLiquidity(value = 1, options) {
  const weiValue = ethers.utils.parseEther(`${value}`);
  const dexAddress = dexContract.address;
  const allowance = await pingContract.allowance(options.from, dexAddress);
  const allowanceNormalized = ethers.utils.formatEther(allowance);

  if (allowanceNormalized < value) {
    const approved = await proxyEvents.confirm(pingContract.approve(dexAddress, weiValue), TransactionType.Deposit);
    await proxyEvents.process(approved.wait(), TransactionType.Deposit);
  }

  const transaction = await proxyEvents.confirm(
    dexContract.deposit({ gasLimit: options.gas, value: weiValue }),
    TransactionType.Deposit
  );
  await proxyEvents.process(transaction.wait(), TransactionType.Deposit);
}

export default {
  addLiquidity,
  connect,
  initialize,
  getAccounts,
  swap,
  ...proxyEvents,
};
