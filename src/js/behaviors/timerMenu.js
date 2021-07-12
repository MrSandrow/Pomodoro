import WarningModal from './warningModal';
import timerState from '../state/timerState';

export default class TimerMenu {
  constructor(domElement) {
    this.domElement = domElement;
  }

  handleSwitch() {}

  switchLayout() {}

  switchState() {}

  switchTimer() {
    this.switchLayout();
    this.switchState();
  }
}
