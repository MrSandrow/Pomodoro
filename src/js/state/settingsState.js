export default {

  timerDurations: {
    domElement: document.querySelector('.modal__timers'),

    currentSettingObject: {
      pomodoro: () => localStorage.getItem('pomodoroDuration') || 25,
      shortBreak: () => localStorage.getItem('shortBreakDuration') || 5,
      longBreak: () => localStorage.getItem('longBreakDuration') || 15,
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
        // eslint-disable-next-line no-param-reassign
        inputElement.value = this.currentSettingObject[inputElement.name]();
      });
    },

    applyNewSetting() {
      // Create an array of all the timer durations form inputs
      const formInputs = Array.from(this.domElement.elements);

      formInputs.forEach((inputElement) => {
        localStorage.setItem(`${inputElement.name}Duration`, inputElement.value);
      });
    },

    validationFunction(inputElement) {
      const inputName = inputElement.name;
      const previousValue = this.previousValue[inputName] || this.currentSettingObject[inputName]();
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
      value: () => localStorage.getItem('font') || 'poppins',
    },

    restoreCurrentSetting() {
      // Create an array of all the font buttons
      const fontButtons = Array.from(this.domElement.children);
      fontButtons.forEach((button) => { button.classList.remove('active'); });

      const currentSetting = this.currentSettingObject.value();
      const previouslyActiveButton = this.domElement.querySelector(`[data-setting=${currentSetting}]`);
      previouslyActiveButton.classList.add('active');
    },

    applyNewSetting() {
      const activeButton = this.domElement.querySelector('.active');
      const newSettingValue = activeButton.dataset.setting;

      localStorage.setItem('font', newSettingValue);
      document.documentElement.dataset.font = newSettingValue;
    },
  },

  color: {
    domElement: document.querySelector('.modal__colors'),

    currentSettingObject: {
      value: () => localStorage.getItem('color') || 'red',
    },

    restoreCurrentSetting() {
      // Create an array of all the color buttons
      const colorButtons = Array.from(this.domElement.children);
      colorButtons.forEach((button) => { button.classList.remove('active'); });

      const currentSetting = this.currentSettingObject.value();
      const previouslyActiveButton = this.domElement.querySelector(`[data-setting=${currentSetting}]`);
      previouslyActiveButton.classList.add('active');
    },

    applyNewSetting() {
      const activeButton = this.domElement.querySelector('.active');
      const newSettingValue = activeButton.dataset.setting;

      localStorage.setItem('color', newSettingValue);
      document.documentElement.dataset.color = newSettingValue;
    },
  },

};
