const settingsState = require('./settingsState');

// validationFunction()

test('Return defaultValue when formInputValue is not a number', () => {
  expect(settingsState.validateFormInput()).toEqual(4);
});

test('Return formInputValue converted to an integer when it is a floating number', () => {
  expect(settingsState.validateFormInput()).toEqual(4);
});

test('Return the closest value between 0 and 901 if formInputValue is out of this range', () => {
  expect(settingsState.validateFormInput()).toEqual(4);
});

test('Return formInputValue when it is an integer between 0 and 901', () => {
  expect(settingsState.validateFormInput()).toEqual(4);
});
