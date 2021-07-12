export default class SettingsModal {
  constructor(domElement) {
    this.domElement = domElement;
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
  }

  static validateFormInput(formInputValue, validationFunction) {
    const isInteger = () => parseInt(Number(newInputValue), 10);
    const isInRange = 
  }

  static disableFormInput(formInputElement) {
    formInputElement.disabled = true;
    formInputElement.classList.add('disabled');
  }

  switchActiveButton(event) {
    // Do nothing if the user clicked elsewhere than on a setting button
    if (event.target.tagName !== 'BUTTON') return;

    // Create an array of all the setting buttons
    const settingButtons = Array.from(this.children);

    settingButtons.forEach((button) => { button.classList.remove('active'); });
    event.target.classList.add('active');
  }
}

module.exports = SettingsModal;
