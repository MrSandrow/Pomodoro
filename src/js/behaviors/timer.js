import gsap from 'gsap';
import audioNotification from '../../audio/notification.mp3';
import settingsState from '../state/settingsState';
import timerState from '../state/timerState';

export default class Timer {
  static initialize(domElement = timerState.domElement) {
    const timerSettings = settingsState.timerDurations.currentSettingObject;
    timerState.timerDurationMilliseconds = timerSettings[timerState.currentMode] * 60_000;

    timerState.domElement = domElement;
    timerState.currentState = 'created';
    timerState.statusMessage = 'start';
    timerState.remainingTimeMilliseconds = null;

    // Kill the previous timer to avoid conflicts
    timerState.progressBarAnimation?.kill();
    clearTimeout(timerState.refreshFunction);

    Timer.animateProgressBar();
    Timer.render();
  }

  static animateProgressBar() {
    const progressBarElement = timerState.domElement.querySelector('.timer__path');
    const pathLength = progressBarElement.getTotalLength();

    progressBarElement.style.strokeDasharray = `${pathLength}px`;
    progressBarElement.style.strokeDashoffset = '0px';

    // Keep the animation synchronized with the timer duration when switching tabs
    gsap.ticker.lagSmoothing(0);

    timerState.progressBarAnimation = gsap.to(progressBarElement, {
      duration: timerState.timerDurationMilliseconds / 1000,
      ease: 'linear',
      strokeDashoffset: pathLength,
      paused: true,
    });
  }

  static handler() {
    Timer[timerState.currentState]();
  }

  static created() {
    const { remainingTimeMilliseconds, timerDurationMilliseconds } = timerState;
    const remainingTime = remainingTimeMilliseconds || timerDurationMilliseconds;

    timerState.timerEndDate = Date.now() + remainingTime;
    timerState.progressBarAnimation.play();
    timerState.currentState = 'running';
    timerState.statusMessage = 'pause';

    // setTimeout is used here because the timer will not render the first second otherwise
    setTimeout(Timer.refreshRemainingTime, 0);
  }

  static running() {
    clearTimeout(timerState.refreshFunction);

    timerState.remainingTimeMilliseconds = Math.max(0, timerState.timerEndDate - Date.now());
    timerState.progressBarAnimation.pause();
    timerState.currentState = 'paused';
    timerState.statusMessage = 'start';

    // Timer time is not rendered here, to prevent the time from changing when pausing the timer
    Timer.renderStatus();
    Timer.renderTitle();
  }

  static paused() {
    Timer.created();
  }

  static finished() {
    Timer.initialize();
    Timer.created();
  }

  static refreshRemainingTime() {
    timerState.remainingTimeMilliseconds = Math.max(0, timerState.timerEndDate - Date.now());

    if (timerState.remainingTimeMilliseconds > 0) {
      timerState.refreshFunction = setTimeout(Timer.refreshRemainingTime, 1000);
      Timer.render();
      return;
    }

    Timer.finishTimer();
  }

  static finishTimer() {
    timerState.currentState = 'finished';
    timerState.statusMessage = 'restart';

    const notification = new Audio(audioNotification);
    notification.play();

    Timer.render();
  }

  static render() {
    Timer.renderTitle();
    Timer.renderStatus();
    Timer.renderTime();
  }

  static renderTitle() {
    const isTimerRunning = timerState.currentState === 'running';

    if (!isTimerRunning) {
      document.title = 'Pomodoro Timer';
      return;
    }

    const remainingMinutes = Math.floor(timerState.remainingTimeMilliseconds / 60_000);
    const firstCharacter = timerState.currentMode[0].toUpperCase();
    const nextCharacters = timerState.currentMode.replace(/([A-Z])/g, ' $1').slice(1);
    const capitalizedTimerMode = firstCharacter + nextCharacters;

    document.title = `${remainingMinutes}m - ${capitalizedTimerMode}`;
  }

  static renderStatus() {
    const statusElement = timerState.domElement.querySelector('.timer__status');
    statusElement.innerText = timerState.statusMessage;
  }

  static renderTime() {
    const timeElement = timerState.domElement.querySelector('.timer__time');

    const { remainingTimeMilliseconds, timerDurationMilliseconds } = timerState;
    const countdownTime = remainingTimeMilliseconds ?? timerDurationMilliseconds;

    const timeToRenderInSeconds = Math.floor(countdownTime / 1000);
    const minutesToRender = Math.floor(timeToRenderInSeconds / 60);
    const secondsToRender = Math.floor(timeToRenderInSeconds % 60);

    const formattedMinutes = minutesToRender < 10 ? `0${minutesToRender}` : minutesToRender;
    const formattedSeconds = secondsToRender < 10 ? `0${secondsToRender}` : secondsToRender;

    timeElement.innerText = `${formattedMinutes}:${formattedSeconds}`;
  }
}
