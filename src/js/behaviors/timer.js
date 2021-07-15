import settingsState from '../state/settingsState';
import timerState from '../state/timerState';

export default class Timer {
  constructor(domElement) {
    this.domElement = domElement;
    this.duration = null;
    this.statusMessage = null;
  }

  initialize() {
    const timerSettings = settingsState.timerDurations.currentSettingObject;

    this.duration = `${timerSettings[timerState.currentMode]}:00`;
    this.statusMessage = 'start';
    timerState.currentState = 'created';

    this.render();
  }

  handler() {
    this[timerState.currentState]();
  }

  created() {
    this.statusMessage = 'pause';
    timerState.currentState = 'running';

    const startDate = Date.now();
    const endDate = Date.now() + 

    console.log(startDate);

    this.render();
  }

  running() {
    this.statusMessage = 'start';
    timerState.currentState = 'paused';

    this.render();
  }

  paused() {
    this.statusMessage = 'pause';
    timerState.currentState = 'running';

    this.render();
  }

  finished() {
    this.statusMessage = 'restart';
  }

  renderTime() {
    const timeElement = this.domElement.querySelector('.timer__time');
    timeElement.innerText = this.duration;
  }

  renderProgressBar() {
    const progressBarElement = this.domElement.querySelector('.timer__path');
    const pathLength = progressBarElement.getTotalLength();
    const timerProgress = 0 / this.duration;

    progressBarElement.style.strokeDasharray = `${pathLength}px`;
    progressBarElement.style.strokeDashoffset = `${pathLength * timerProgress}px`;
  }

  renderStatus() {
    const statusElement = this.domElement.querySelector('.timer__status');
    statusElement.innerText = this.statusMessage;
  }

  render() {
    this.renderTime();
    this.renderProgressBar();
    this.renderStatus();
  }
}
