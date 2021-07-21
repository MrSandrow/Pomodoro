import settingsState from '../state/settingsState';
import timerState from '../state/timerState';

export default class Timer {
  static initialize(domElement = timerState.domElement) {
    const timerSettings = settingsState.timerDurations.currentSettingObject;

    timerState.domElement = domElement;
    timerState.timerDurationMilliseconds = timerSettings[timerState.currentMode] * 60_000;
    timerState.remainingTime = null;
    timerState.currentState = 'created';
    timerState.statusMessage = 'start';
    clearTimeout(timerState.refreshFunction);

    Timer.render();
  }

  static handler() {
    Timer[timerState.currentState]();
  }

  static created() {
    const remainingTime = timerState.remainingTime || timerState.timerDurationMilliseconds;

    timerState.timerEndDate = Date.now() + remainingTime;
    timerState.currentState = 'running';
    timerState.statusMessage = 'pause';

    // setTimeout is used here because the timer will not render the first second otherwise
    setTimeout(Timer.refreshRemainingTime, 0);
  }

  static running() {
    clearTimeout(timerState.refreshFunction);

    timerState.remainingTime = Math.max(0, timerState.timerEndDate - Date.now());
    timerState.currentState = 'paused';
    timerState.statusMessage = 'start';

    // Only status is rendered here, to prevent the time from changing when pausing the timer
    Timer.renderStatus();
  }

  static paused() {
    Timer.created();
  }

  static finished() {
    Timer.initialize();
    Timer.created();
  }

  static refreshRemainingTime() {
    timerState.remainingTime = Math.max(0, timerState.timerEndDate - Date.now());

    if (timerState.remainingTime > 0) {
      timerState.refreshFunction = setTimeout(Timer.refreshRemainingTime, 1000);
      Timer.render();
      return;
    }

    Timer.finishTimer();
  }

  static finishTimer() {
    timerState.currentState = 'finished';
    timerState.statusMessage = 'restart';

    Timer.render();
  }

  static render() {
    Timer.renderStatus();
    Timer.renderTime();
    Timer.renderProgressBar();
  }

  static renderStatus() {
    const statusElement = timerState.domElement.querySelector('.timer__status');
    statusElement.innerText = timerState.statusMessage;
  }

  static renderTime() {
    const timeElement = timerState.domElement.querySelector('.timer__time');
    const countdownTime = timerState.remainingTime ?? timerState.timerDurationMilliseconds;

    const timeToRender = new Date(countdownTime);
    const hoursToRender = timeToRender.getHours();
    const minutesToRender = timeToRender.getMinutes();
    // const secondsToRender = timeToRender.getSeconds();

    const convertHoursToMinutes = (hoursToRender - 1) * 60 + minutesToRender;
    const formattedMinutes = convertHoursToMinutes < 10 ? `0${convertHoursToMinutes}` : convertHoursToMinutes;
    // const formattedSeconds = secondsToRender < 10 ? `0${secondsToRender}` : secondsToRender;

    timeElement.innerText = `${formattedMinutes}:${hoursToRender}`;
  }

  static renderProgressBar() {
    const progressBarElement = timerState.domElement.querySelector('.timer__path');
    const pathLength = progressBarElement.getTotalLength();

    const timerDuration = Math.floor(timerState.timerDurationMilliseconds / 1000);
    const remainingTime = Math.floor(timerState.remainingTime / 1000);
    const validatedRemainingTime = typeof timerState.remainingTime === 'number' ? remainingTime : timerDuration;

    const timerProgress = (timerDuration - validatedRemainingTime) / timerDuration;
    progressBarElement.style.strokeDasharray = `${pathLength}px`;
    progressBarElement.style.strokeDashoffset = `${pathLength * timerProgress}px`;
  }
}
