## Event Listeners

- Menu (separate timers from the settings button)
- Timer
- Settings (2 buttons)
- Change Color / Font (settings)
- Apply / Decline Modal

## Behaviors

TimerMenu(parentDiv, eventTarget, isTimmerRunning, warning.display)
  handleSwitch (switchTimer or warning.display) (do nothing if eventtarget is already "active")
  switchLayout(parentDiv, eventTarget)
  switchState()
  switchTimer() switchlayout & switchState

Modal(dom element)
  displayModal(dom element)
  hideModal(dom element)

WarningModal(func) extends Modal
  cancel() this.hideModal
  apply(func) func() & this.hideModal

SettingsModal extends Modal
  validateFormInput(dom element, validationFunction) (if eventtarget is input => eventtarget.value = validationFunction(eventtarget.value))
  disableFormInput(dom element)
  switchLayout(parentDiv, eventTarget)
  cancel() state/settings.forEach(restoreCurrentSetting()) & this.hideModal
  apply() state/settings.forEach(applyNewSetting()) & this.hideModal

Timer(timerDurations)
  initialize() (state created -> reset remainingTime -> render(duration, progressbar, start))
  handler() (this\[currentState\]())

  _created() (state running -> (date.nom + duration) - date.now -> disableFormInput(input) -> render x60)
  _running() (state paused -> save remainingTime -> render)
  _paused() (state running -> (date.now + remainingTime) - date.now -> render x60 -> logic when finished)
  _finished() created()

  _renderProgressBar(dom element, time, duration)
  _renderStatus(dom element, message)
  _renderTime(dom element, time)
  _render(dom element, message, duration)

## State
  
Settings
  timerDurations
    domElement
    currentSettingObject
    restoreCurrentSetting()
    applyNewSetting()
    validationFunction(input) (integer between 0 and 960)

  color
    domElement
    currentSettingObject
    restoreCurrentSetting()
    applyNewSetting()

  font
    domElement
    currentSettingObject
    restoreCurrentSetting()
    applyNewSetting()

Timer
  currentMode
  currentState
  remainingTime