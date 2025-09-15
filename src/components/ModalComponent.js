/**
 * Modal component for error messages
 */
export class ModalComponent {
  constructor(eventBus) {
    this.eventBus = eventBus
    this.render()
  }

  render() {
    const modalContainer = document.getElementById('modal-container')
    if (modalContainer) {
      modalContainer.innerHTML = this.getTemplate()
    }
  }

  getTemplate() {
    return `
      <div id="error-modal" class="fixed inset-0 bg-neutral-800 bg-opacity-75 flex items-center justify-center p-4 z-50 hidden">
        <div class="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
          <h3 class="text-xl font-bold text-red-600 mb-4">Erro</h3>
          <p id="error-message" class="text-neutral-700 mb-6"></p>
          <button id="close-modal" class="px-6 py-2 bg-red-500 text-white rounded-full font-semibold">OK</button>
        </div>
      </div>
    `
  }

  showError(message) {
    const modal = document.getElementById('error-modal')
    const errorMessage = document.getElementById('error-message')
    
    if (modal && errorMessage) {
      errorMessage.textContent = message
      modal.classList.remove('hidden')
      
      const closeButton = document.getElementById('close-modal')
      if (closeButton) {
        // Remove existing listeners to prevent duplicates
        const newCloseButton = closeButton.cloneNode(true)
        closeButton.parentNode.replaceChild(newCloseButton, closeButton)
        
        newCloseButton.addEventListener('click', () => {
          modal.classList.add('hidden')
        })
      }
    }
  }
}
