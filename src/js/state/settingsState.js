export default {

  timerDurations: {
    domElement: document.querySelector('.modal__timers'),

    currentSettingObject: {
      pomodoro: 25,
      shortBreak: 5,
      longBreak: 15,
    },

    previousValue: {
      pomodoro: null,
      shortBreak: null,
      longBreak: null,
    },

    restoreCurrentSetting() {
      // Create an array of all the timer durations form inputs
      const formInputs = Array.from(this.domElement.elements);

      formInputs.forEach((inputElement) => {
        inputElement.value = this.currentSettingObject[inputElement.name]; // eslint-disable-line no-param-reassign, max-len
      });
    },

    applyNewSetting() {
      // Create an array of all the timer durations form inputs
      const formInputs = Array.from(this.domElement.elements);

      formInputs.forEach((inputElement) => {
        this.currentSettingObject[inputElement.name] = inputElement.value;
      });
    },

    validationFunction(inputElement) {
      const inputName = inputElement.name;
      const previousValue = this.previousValue[inputName] || this.currentSettingObject[inputName];
      const valueToCheck = inputElement.value;

      const convertToInteger = parseInt(valueToCheck, 10);
      const convertToPositive = Math.max(1, convertToInteger);
      const limitateMaxValue = Math.min(90, convertToPositive);
      const validatedInput = limitateMaxValue || previousValue;

      this.previousValue[inputName] = validatedInput;
      return validatedInput;
    },
  },

  font: {
    domElement: document.querySelector('.modal__fonts'),

    currentSettingObject: {
      value: 'poppins',
    },

    restoreCurrentSetting() {
      // Create an array of all the font buttons
      const fontButtons = Array.from(this.domElement.children);
      fontButtons.forEach((button) => { button.classList.remove('active'); });

      const currentSetting = this.currentSettingObject.value;
      const previouslyActiveButton = this.domElement.querySelector(`[data-setting=${currentSetting}]`);
      previouslyActiveButton.classList.add('active');
    },

    applyNewSetting() {
      const activeButton = this.domElement.querySelector('.active');
      const newSettingValue = activeButton.dataset.setting;

      this.currentSettingObject.value = newSettingValue;
      document.documentElement.dataset.font = newSettingValue;
    },
  },

  color: {
    domElement: document.querySelector('.modal__colors'),

    currentSettingObject: {
      value: 'red',
    },

    restoreCurrentSetting() {
      // Create an array of all the color buttons
      const colorButtons = Array.from(this.domElement.children);
      colorButtons.forEach((button) => { button.classList.remove('active'); });

      const currentSetting = this.currentSettingObject.value;
      const previouslyActiveButton = this.domElement.querySelector(`[data-setting=${currentSetting}]`);
      previouslyActiveButton.classList.add('active');
    },

    applyNewSetting() {
      const activeButton = this.domElement.querySelector('.active');
      const newSettingValue = activeButton.dataset.setting;

      this.currentSettingObject.value = newSettingValue;
      document.documentElement.dataset.color = newSettingValue;
    },
  },

};
