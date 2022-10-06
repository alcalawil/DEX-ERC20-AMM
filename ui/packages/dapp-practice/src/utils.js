import { Message, WalletEvent } from './constants';

const quotes = 1;

export const TokenTransform = {
  'eth-pingt': (value) => value * quotes,
  'pingt-eth': (value) => value / quotes,
};

export function transformTokenTo(from, to, value) {
  const transform = TokenTransform[`${from}-${to}`];

  return transform?.(value) || '';
}

export function convertWeiToEther(amount) {
  // 1 ether is 1000000000000000000 wei
  return (amount / 1e18).toFixed(2);
}

export function truncatedAddress(account) {
  const truncated = account.replace(/(\w{6})\w+(\w{4})$/, '$1...$2');

  return truncated;
}

export function restrictMaxLength(callback, maxLength) {
  return (event) => {
    const { value } = event.target;
    const valueRestricted = value.substring(0, maxLength);

    event.target.value = valueRestricted;
    callback(event);
  };
}

export function restrictOnlyNumber(callback) {
  return (event) => {
    const { value } = event.target;
    const valueRestricted = value
      .replace(/[^0-9.]/g, '')
      .replace('.', '_')
      .replace(/\./g, '')
      .replace('_', '.');

    event.target.value = valueRestricted;
    callback(event);
  };
}

export function ProxyEvents() {
  const mapHandlers = {};
  const chain = { on, dispatch, off, process, confirm };

  function dispatch(event, data) {
    mapHandlers[event]?.forEach((handler) => handler({ event, data }));

    return chain;
  }

  async function confirm(promiseTx, txType) {
    try {
      dispatch(WalletEvent.Confirm, { tx: txType, message: Message[txType].Confirm });

      return await Promise.resolve(promiseTx);
    } catch (error) {
      console.log(error);

      const { action, code } = error;
      dispatch(WalletEvent.Failed, { tx: txType, message: Message[txType].Failed, action, code });

      throw error;
    }
  }

  async function process(promiseTx, txType) {
    try {
      dispatch(WalletEvent.Pending, { tx: txType, message: Message[txType].Pending });

      await Promise.resolve(promiseTx);

      dispatch(WalletEvent.Success, { tx: txType, message: Message[txType].Success });
    } catch (error) {
      console.log(error);

      const { action, code } = error;
      dispatch(WalletEvent.Failed, { tx: txType, message: Message[txType].Failed, action, code });

      throw error;
    }
  }

  function on(eventType, handler) {
    if (!mapHandlers[eventType]) {
      mapHandlers[eventType] = [];
    }

    mapHandlers[eventType].push(handler);

    return chain;
  }

  function off(eventType, handler) {
    const index = mapHandlers[eventType].indexOf(handler);

    if (index >= 0) {
      mapHandlers[eventType].splice(index, 1);
    }

    return chain;
  }

  return chain;
}
