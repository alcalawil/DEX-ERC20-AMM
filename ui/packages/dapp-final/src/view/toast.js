const toastTemp = `
 <div data-name="toast-container" aria-live="assertive" class="flex w-full flex-col mt-4 items-center space-y-4 sm:items-end">
        <div
          class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div class="p-4">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <img data-name="toast-status" class="h-5 w-5" src="" atl="">
              </div>
              <div class="ml-3 w-0 flex-1 pt-0.5">
                <p data-name="toast-title" class="text-sm font-medium text-gray-900"></p>
                <p data-name="toast-desc" class="mt-1 text-sm text-gray-500"></p>
              </div>
              <div class="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  data-name="toast-button"
                  class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span class="sr-only">Close</span>
                  <img src="/public/close-icon.svg" class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
`;

const controllers = {
  temp: document.createElement('div'),
  container: document.querySelector('#toasts'),
};

function initialize() {
  controllers.temp.innerHTML = toastTemp;
}

function open({ status, title, message }, cleanBefore) {
  const toastContainer = controllers.temp.querySelector('[data-name="toast-container"]').cloneNode(true);
  const titleTag = toastContainer.querySelector('[data-name="toast-title"]');
  const statusTag = toastContainer.querySelector('[data-name="toast-status"]');
  const descTag = toastContainer.querySelector('[data-name="toast-desc"]');
  const buttonTag = toastContainer.querySelector('[data-name="toast-button"]');

  statusTag.src = `/public/${status}-icon.svg`;
  titleTag.textContent = title;
  descTag.textContent = message;

  buttonTag.onclick = () => {
    controllers.container.removeChild(toastContainer);
  };

  controllers.container.appendChild(toastContainer);

  if (cleanBefore) {
    while (toastContainer.previousElementSibling) {
      controllers.container.removeChild(toastContainer.previousElementSibling);
    }
  }
}

export default {
  initialize,
  open,
};
