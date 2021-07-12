export default settingsState = {
  timerDurations: {
    domElement: 'f',
    currentSettingObject: {},

    restoreCurrentSetting() {

    },

    applyNewSetting() {

    },

    validationFunction(inputValue) {
      const isInteger = () => parseInt(inputValue, 10);
      const isPositive = () => Math.max(1, isInteger());

      return isPositive || defaultValue;

      const isInRange = () => Math.min(isPositive(), 900);

      return isInRange();
    },
  },

  color: {
    domElement: 'f',
    currentSettingObject: {},

    restoreCurrentSetting() {

    },

    applyNewSetting() {

    },
  },

  font: {
    domElement: 'f',
    currentSettingObject: {},

    restoreCurrentSetting() {
    },

    applyNewSetting() {
    },
  },
};

module.exports = settingsState;
