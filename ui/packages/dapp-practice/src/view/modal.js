const controllers = {
  modal: document.querySelector('#metamask-modal'),
  backdrop: document.querySelector('#metamask-modal .modal-backdrop'),
};

const initialize = () => {
  controllers.backdrop.addEventListener('click', close);
};

const close = () => {
  controllers.modal.classList.remove('open');
  controllers.backdrop.removeEventListener('click', close);
};

function open() {
  controllers.modal.classList.add('open');
}

export default {
  open,
  close,
  initialize,
};
