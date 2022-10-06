// import Web3Lib from './web3Libs/ether';
import Web3Lib from './web3Libs/web3';

import Wallet from './wallet';
import { StatusType, WalletEvent } from './constants';

import HeaderView from './view/header';
import SwapFormView from './view/swap-form';
import MetamaskModalView from './view/modal';
import AddLiquidityView from './view/liquidity-modal';
import ToastView from './view/toast';

function initialize() {
  // initialize views
  ToastView.initialize();
  MetamaskModalView.initialize();
  SwapFormView.initialize({ onSubmit: handleSubmitForm });
  AddLiquidityView.initialize({ onSubmit: handleSubmitLiquidityForm });
  HeaderView.initialize({ onConnect: handleConnectToWallet, onLiquidity: handleAddLiquidity });

  // initialize wallet
  initializeWallet();
  checkIsConnected();
}

function initializeWallet() {
  Wallet.initialize(Web3Lib);
  Wallet.on(WalletEvent.Confirm, ({ data: { tx, message } }) => {
    SwapFormView.clean();
    ToastView.open({ status: StatusType.Information, title: tx, message });
  });

  Wallet.on(WalletEvent.Pending, ({ data: { tx, message } }) => {
    ToastView.open({ status: StatusType.Warning, title: tx, message }, true);
  });

  Wallet.on(WalletEvent.Success, ({ data: { tx, message } }) => {
    ToastView.open({ status: StatusType.Success, title: tx, message }, true);
  });

  Wallet.on(WalletEvent.Failed, ({ data: { tx, code, action, message } }) => {
    ToastView.open({ status: StatusType.Error, title: tx, message: `${message} ${code || ''}  ${action || ''}` }, true);
  });
}

function render(props) {
  HeaderView.render(props);
  SwapFormView.render(props);
}

async function checkIsConnected() {
  await Wallet.getAccounts();

  if (Wallet.isConnected()) handleConnectToWallet();
}

async function handleAddLiquidity() {
  AddLiquidityView.open();
}

async function handleConnectToWallet() {
  if (Wallet.hasWalletInstalled()) {
    try {
      await Wallet.connect();

      render({ isConnected: true, address: Wallet.getAddress() });
    } catch (error) {
      console.warn(error);
      render({ isConnected: false });
    }
  } else {
    MetamaskModalView.open();
  }
}

async function handleSubmitLiquidityForm(value) {
  try {
    Wallet.addLiquidity(value);
  } catch {
    return; // Early return;
  }
}

async function handleSubmitForm({ swapTokenFrom, swapAmountFrom, swapAmountTo }) {
  if (Wallet.isConnected()) {
    const amount = swapTokenFrom === 'eth' ? swapAmountFrom : swapAmountTo;
    await Wallet.swap(swapTokenFrom, amount);
  } else {
    handleConnectToWallet();
  }
}

initialize();
