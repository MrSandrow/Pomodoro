const settingsState = require('./settingsState').default;

// timerDurations > validationFunction(inputElement)

test('Return valueToCheck converted to an integer when it is a floating number', () => {
  expect(settingsState.timerDurations.validationFunction({ name: 'pomodoro', value: '0,8' })).toEqual(1);
  expect(settingsState.timerDurations.validationFunction({ name: 'pomodoro', value: '0.2' })).toEqual(1);
});

test('Return the closest value between 0 and 91 if valueToCheck is out of this range', () => {
  expect(settingsState.timerDurations.validationFunction({ name: 'pomodoro', value: '-40' })).toEqual(1);
  expect(settingsState.timerDurations.validationFunction({ name: 'pomodoro', value: '0' })).toEqual(1);
  expect(settingsState.timerDurations.validationFunction({ name: 'pomodoro', value: '980' })).toEqual(90);
});

test('Return previousValue when valueToCheck is not a number', () => {
  const previousValueProperty = settingsState.timerDurations.previousValue.pomodoro;
  const defaultValueProperty = settingsState.timerDurations.currentSettingObject.pomodoro;
  const previousValue = previousValueProperty || defaultValueProperty;

  expect(settingsState.timerDurations.validationFunction({ name: 'pomodoro', value: ',' })).toEqual(previousValue);
  expect(settingsState.timerDurations.validationFunction({ name: 'pomodoro', value: '-' })).toEqual(previousValue);
});

test('Return valueToCheck when it is an integer between 0 and 91', () => {
  expect(settingsState.timerDurations.validationFunction({ name: 'pomodoro', value: '52' })).toEqual(52);
});
