import { transformTokenTo, restrictMaxLength, restrictOnlyNumber } from '../utils';

const controllers = {
  submitBtn: document.querySelector('[data-name="submit-button"]'),
  swapBtn: document.querySelector('[data-name="swap-asset-button"]'),
  swapTokenFrom: document.querySelector('#swap-token-from'),
  swapAmountFrom: document.querySelector('#swap-amount-from'),
  swapTokenTo: document.querySelector('#swap-token-to'),
  swapAmountTo: document.querySelector('#swap-amount-to'),
  form: document.querySelector('#swap-form'),
};

function clean() {
  controllers.swapAmountTo.value = '';
  controllers.swapAmountFrom.value = '';
}

function enableForm() {
  controllers.submitBtn.textContent = 'Swap';
  controllers.submitBtn.type = 'submit';
}

function disabledForm() {
  controllers.submitBtn.textContent = 'Connect wallet';
  controllers.submitBtn.type = 'button';
}

function initialize({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(getFormData());
  };

  controllers.submitBtn.addEventListener('click', handleSubmit);
  controllers.swapBtn.addEventListener('click', handleSwapTokenFrom);
  controllers.swapAmountFrom.addEventListener('input', restrictOnlyNumber(restrictMaxLength(handleSwapFromInput, 16)));
  controllers.swapAmountTo.addEventListener('input', restrictOnlyNumber(restrictMaxLength(handleSwapToInput, 18)));
}

function handleSwapTokenFrom() {
  const swapTokenFrom = controllers.swapTokenFrom.value;
  const swapTag = controllers.swapAmountFrom.nextElementSibling;
  const receiveTag = controllers.swapAmountTo.nextElementSibling;
  const swapAmountTo = controllers.swapAmountTo.value;

  // Swap icons
  controllers.swapAmountFrom.parentElement.appendChild(receiveTag);
  controllers.swapAmountTo.parentElement.appendChild(swapTag);

  // Swap destinations
  controllers.swapTokenFrom.value = controllers.swapTokenTo.value;
  controllers.swapTokenTo.value = swapTokenFrom;

  // Swap Value of 'amount from' input and transform
  controllers.swapAmountFrom.value = swapAmountTo;

  // Swap Value of 'amount to' input  and transform
  controllers.swapAmountTo.value = transformTokenTo(
    controllers.swapTokenFrom.value,
    controllers.swapTokenTo.value,
    swapAmountTo
  );
}

function getFormData() {
  return {
    swapTokenTo: controllers.swapTokenTo.value,
    swapTokenFrom: controllers.swapTokenFrom.value,

    swapAmountTo: controllers.swapAmountTo.value,
    swapAmountFrom: controllers.swapAmountFrom.value,
  };
}

const handleSwapFromInput = ({ target: { value } }) => {
  const {
    swapTokenFrom: { value: swapTokenFromValue },
    swapTokenTo: { value: swapTokenToValue },
  } = controllers.form.elements;

  controllers.swapAmountTo.value = transformTokenTo(swapTokenFromValue, swapTokenToValue, +value);
  controllers.swapAmountTo.setAttribute('value', controllers.swapAmountTo.value);
};

const handleSwapToInput = ({ target: { value } }) => {
  const {
    swapTokenFrom: { value: swapTokenFromValue },
    swapTokenTo: { value: swapTokenToValue },
  } = controllers.form.elements;

  controllers.swapAmountFrom.value = transformTokenTo(swapTokenToValue, swapTokenFromValue, +value);
  controllers.swapAmountFrom.setAttribute('value', controllers.swapAmountFrom.value);
};

export default {
  initialize,
  render({ isConnected }) {
    if (isConnected) enableForm();
    else disabledForm();
  },
  clean,
  getFormData,
};
