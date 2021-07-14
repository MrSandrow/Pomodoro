import WarningModal from './warningModal';
import timerState from '../state/timerState';

const warningModalElement = document.querySelector('.warning');
const warningModal = new WarningModal(warningModalElement);

export default class TimerMenu {
  constructor(domElement) {
    this.domElement = domElement;
  }

  handleSwitch(event) {
    const activeButton = event.target.closest('.menu__button');
    const isAlreadyActive = activeButton?.classList.contains('active');

    // Do nothing if the user clicked elsewhere than on a menu button that is not already active
    if (!activeButton || isAlreadyActive) return;

    const isTimerActive = timerState.currentState === ('running' || 'paused');

    if (isTimerActive) {
      const functionToRun = () => { this.switchTimer(activeButton); };

      warningModal.initialize(functionToRun);
      warningModal.displayModal();

      return;
    }

    this.switchTimer(activeButton);
  }

  switchTimer(activeButton) {
    this.switchLayout(activeButton);
    TimerMenu.switchState(activeButton);
  }

  switchLayout(activeButton) {
    // Create an array of all the menu buttons
    const menuButtons = Array.from(this.domElement.children);

    menuButtons.forEach((item) => { item.classList.remove('active'); });
    activeButton.classList.add('active');
  }

  static switchState(activeButton) {
    const newTimerMode = activeButton.dataset.setting;
    timerState.currentMode = newTimerMode;
  }
}
