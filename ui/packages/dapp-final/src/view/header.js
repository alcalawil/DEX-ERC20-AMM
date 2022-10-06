import { truncatedAddress } from '../utils';

const controllers = {
  connectBtn: document.querySelector('[data-name="connect-button"]'),
  liquidityBtn: document.querySelector('[data-name="liquidity-button"]'),
};

function enabled(address) {
  controllers.connectBtn.textContent = truncatedAddress(address);
  controllers.connectBtn.classList.remove('bg-accent-500');
  controllers.connectBtn.classList.add('bg-accent-300');
  controllers.connectBtn.disabled = true;

  controllers.liquidityBtn.removeAttribute('disabled');
  controllers.liquidityBtn.classList.add('bg-accent-500');
  controllers.liquidityBtn.classList.remove('bg-accent-300');
}

function disabled() {
  controllers.connectBtn.textContent = 'Connect wallet';
  controllers.connectBtn.classList.add('bg-accent-500');
  controllers.connectBtn.classList.remove('bg-accent-300');
  controllers.connectBtn.removeAttribute('disabled');

  controllers.liquidityBtn.setAttribute('disabled', '');
  controllers.liquidityBtn.classList.remove('bg-accent-500');
  controllers.liquidityBtn.classList.add('bg-accent-300');
}

function initialize({ onConnect, onLiquidity }) {
  controllers.connectBtn.addEventListener('click', onConnect);
  controllers.liquidityBtn.addEventListener('click', onLiquidity);
}

export default {
  initialize,
  render({ isConnected, address }) {
    if (isConnected) enabled(address);
    else disabled();
  },
};
