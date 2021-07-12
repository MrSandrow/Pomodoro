const ImportedClass = require('./settingsModal');

const SettingsModal = new ImportedClass();

// validateFormInput()



// disableFormInput

test('disableFormInput', () => {
  expect(SettingsModal.disableFormInput()).toEqual(4);
});
