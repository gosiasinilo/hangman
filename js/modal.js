export class Modal {
  constructor(selector, openSelector) {
    this.modal = document.querySelector(selector);
    this.openButton = document.querySelector(openSelector);
    this.closeButton = this.modal.querySelector('button');
    this.closeButton.addEventListener('click', () => this.close());
    this.openButton.addEventListener('click', () => this.open());

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  closeOnOutsideClick(event) {
    console.log('Runs');
    console.log(event.target);
    console.log(this.modal);
    if (event.target === this.modal) {
      this.close();
    }
  }
  close() {
    this.modal.style.display = 'none';
    this.modal.removeEventListener('click', (e) => this.closeOnOutsideClick(e));
  }

  open() {
    this.modal.style.display = 'flex';
    this.modal.addEventListener('click', (e) => this.closeOnOutsideClick(e));
  }
}
