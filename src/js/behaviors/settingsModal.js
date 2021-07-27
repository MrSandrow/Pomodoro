import settingsState from '../state/settingsState';
import timerState from '../state/timerState';
import Timer from './timer';

export default class SettingsModal {
  constructor(domElement) {
    this.domElement = domElement;
    this.formElement = this.domElement.querySelector('form');
  }

  initialize() {
    this.addEventListeners();
    this.renderSettings();
  }

  addEventListeners() {
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

  renderSettings() {
    this.renderTimerDurations();
    this.renderFontSetting();
    this.renderColorSetting();
  }

  renderTimerDurations() {
    const timerDurations = settingsState.timerDurations.currentSettingObject;
    const formInputs = Array.from(this.formElement.elements);

    formInputs.forEach((inputElement) => {
      // eslint-disable-next-line no-param-reassign
      inputElement.value = timerDurations[inputElement.name]();
    });
  }

  renderFontSetting() {
    const fontSetting = settingsState.font.currentSettingObject.value();
    const fontButton = this.domElement.querySelector(`[data-setting=${fontSetting}]`);

    fontButton.classList.add('active');
    document.documentElement.dataset.font = fontSetting;
  }

  renderColorSetting() {
    const colorSetting = settingsState.color.currentSettingObject.value();
    const colorButton = this.domElement.querySelector(`[data-setting=${colorSetting}]`);

    colorButton.classList.add('active');
    document.documentElement.dataset.color = colorSetting;
  }

  static renderTextElements() {
    const textElements = document.querySelectorAll('.text-element');
    textElements.forEach((textElement) => { textElement.classList.remove('hidden'); });
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

    // Apply new duration to current timer if it is not running
    if (timerState.currentState === ('created')) Timer.initialize();

    this.hideModal();
  }

  static validateFormInput(validationFunction) {
    return function callValidationFunction(event) {
      const inputElement = event.target;
      inputElement.value = validationFunction(inputElement);
    };
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
