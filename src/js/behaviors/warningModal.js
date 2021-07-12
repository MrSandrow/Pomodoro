export default class WarningModal {
  constructor(domElement, functionToRun) {
    this.domElement = domElement;
    this.functionToRun = functionToRun;
  }

  initialize() {
    const cancelButton = this.domElement.querySelector('.modal__control--cancel');
    const applyButton = this.domElement.querySelector('.modal__control--apply');

    // 'this' is bound on event listeners to avoid losing it
    cancelButton.addEventListener('click', this.cancel.bind(this));
    applyButton.addEventListener('click', this.apply.bind(this));
  }

  displayModal() {
    this.domElement.classList.remove('hidden');
  }

  hideModal() {
    this.domElement.classList.add('hidden');
  }

  cancel() {
    this.hideModal();
  }

  apply() {
    this.hideModal();
    this.functionToRun();
  }
}
