import settingsState from '../state/settingsState';

export default class SettingsModal {
  constructor(domElement) {
    this.domElement = domElement;
    this.formElement = this.domElement.querySelector('form');
  }

  initialize() {
    const cancelButton = this.domElement.querySelector('.modal__control--cancel');
    const applyButton = this.domElement.querySelector('.modal__control--apply');

    // 'this' is bound on event listeners to avoid losing it
    cancelButton.addEventListener('click', this.cancel.bind(this));
    applyButton.addEventListener('click', this.apply.bind(this));

    const validateTimerDuration = settingsState.timerDurations.validationFunction;
    const boundValidateTimerDuration = validateTimerDuration.bind(settingsState.timerDurations);
    const validateFormInput = SettingsModal.validateFormInput(boundValidateTimerDuration);

    this.formElement.addEventListener('focusout', validateFormInput);
  }

  displayModal() {
    this.domElement.classList.remove('hidden');
  }

  hideModal() {
    this.domElement.classList.add('hidden');
  }

  cancel() {
    Object.keys(settingsState).forEach((setting) => {
      settingsState[setting].restoreCurrentSetting();
    });

    this.hideModal();
  }

  apply() {
    Object.keys(settingsState).forEach((setting) => {
      settingsState[setting].applyNewSetting();
    });

    // TODO : Reinitialize Timer
    this.hideModal();
  }

  static validateFormInput(validationFunction) {
    return function callValidationFunction(event) {
      const inputElement = event.target;
      inputElement.value = validationFunction(inputElement);
    };
  }

  disableFormInput(inputName) {
    const inputToDisable = this.formElement[inputName];
    inputToDisable.setAttribute('readonly', 'true');
  }

  enableFormInput(inputName) {
    const inputToEnable = this.formElement[inputName];
    inputToEnable.removeAttribute('readonly');
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
