const controllers = {
  modal: document.querySelector('#add-liquidity-modal'),
  form: document.querySelector('#add-liquidity-form'),
  input: document.querySelector('#add-liquidity-input'),
  submitBtn: document.querySelector('.add-submit-button'),
  backdrop: document.querySelector('#add-liquidity-modal .modal-backdrop'),
  closeBtn: document.querySelector('#add-liquidity-modal button[data-name="close-button"]'),
};

function initialize({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(controllers.input.value);
    close();
  };

  controllers.submitBtn.addEventListener('click', handleSubmit);
  controllers.closeBtn.addEventListener('click', close);
  controllers.backdrop.addEventListener('click', close);
}

const close = () => {
  controllers.modal.classList.remove('open');
};

function open() {
  controllers.modal.classList.add('open');
}

export default {
  initialize,
  open,
  close,
};
