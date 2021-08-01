import gsap from 'gsap';
import audioNotification from '../../audio/notification.mp3';
import settingsState from '../state/settingsState';
import timerState from '../state/timerState';

export default class Timer {
  static initialize(domElement = timerState.domElement) {
    timerState.domElement = domElement;
    timerState.currentState = 'created';
    timerState.statusMessage = 'start';
    timerState.audioNotification = new Audio(audioNotification);

    // Keep the animations synchronized with the timer duration when switching tabs
    gsap.ticker.lagSmoothing(0);

    Timer.initializeTimer();
    Timer.initializeProgressBar();

    Timer.render();
  }

  static initializeTimer() {
    // Kill the previous timer to avoid conflicts
    timerState.timerFunction?.kill();
    clearTimeout(timerState.finishFunction);

    const timerSettings = settingsState.timerDurations.currentSettingObject;
    timerState.timerDurationSeconds = timerSettings[timerState.currentMode]() * 60;
    timerState.remainingTimeSeconds = timerState.timerDurationSeconds;

    timerState.timerFunction = gsap.to(timerState, {
      duration: timerState.timerDurationSeconds,
      remainingTimeSeconds: 0,
      ease: 'linear',
      paused: true,
      onUpdate: Timer.render,
    });
  }

  static initializeProgressBar() {
    // Kill the previous timer to avoid conflicts
    timerState.progressBarAnimation?.kill();

    const progressBarElement = timerState.domElement.querySelector('.timer__path');
    const pathLength = progressBarElement.getTotalLength();

    progressBarElement.style.strokeDasharray = `${pathLength}px`;
    progressBarElement.style.strokeDashoffset = '0px';

    timerState.progressBarAnimation = gsap.to(progressBarElement, {
      duration: timerState.timerDurationSeconds,
      strokeDashoffset: pathLength,
      ease: 'linear',
      paused: true,
    });
  }

  static finishTimer() {
    // timerFunction.progress() does not update by itself when the user is not on the page
    // It is updated here to avoid a potential bug in Timer.saveWorkedTime()
    timerState.timerFunction.progress(1);

    Timer.saveWorkedTime();

    timerState.currentState = 'finished';
    timerState.statusMessage = 'restart';
    timerState.audioNotification.play();

    Timer.render();
  }

  static saveWorkedTime() {
    const isWorkedTime = timerState.currentMode === 'pomodoro';
    const isTimerFinished = timerState.currentState === 'finished';

    if (!isWorkedTime || isTimerFinished) return;

    const previousWorkedTime = localStorage.getItem('secondsSpentWorking') || 0;
    const newWorkedTime = timerState.timerDurationSeconds * timerState.timerFunction.progress();
    const totalWorkedTime = Number(previousWorkedTime) + Math.floor(newWorkedTime);

    localStorage.setItem('secondsSpentWorking', totalWorkedTime);
  }

  static handler() {
    Timer[timerState.currentState]();
  }

  static created() {
    const remainingTime = timerState.remainingTimeSeconds * 1000;
    timerState.finishFunction = setTimeout(Timer.finishTimer, remainingTime);

    timerState.currentState = 'running';
    timerState.statusMessage = 'pause';

    timerState.timerFunction.play();
    timerState.progressBarAnimation.play();
  }

  static running() {
    clearTimeout(timerState.finishFunction);

    timerState.currentState = 'paused';
    timerState.statusMessage = 'start';

    timerState.timerFunction.pause();
    timerState.progressBarAnimation.pause();

    Timer.render();
  }

  static paused() {
    Timer.created();
  }

  static finished() {
    Timer.initialize();
    Timer.created();
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

    const remainingMinutes = Math.floor(timerState.remainingTimeSeconds / 60);
    const firstCharacter = timerState.currentMode[0].toUpperCase();
    const nextCharacters = timerState.currentMode.replace(/([A-Z])/, ' $1').slice(1);
    const capitalizedTimerMode = firstCharacter + nextCharacters;

    document.title = `${remainingMinutes}m - ${capitalizedTimerMode}`;
  }

  static renderStatus() {
    const statusElement = timerState.domElement.querySelector('.timer__status');
    statusElement.innerText = timerState.statusMessage;
  }

  static renderTime() {
    const timeElement = timerState.domElement.querySelector('.timer__time');

    const minutesToRender = Math.floor(timerState.remainingTimeSeconds / 60);
    const secondsToRender = Math.floor(timerState.remainingTimeSeconds % 60);

    const formattedMinutes = minutesToRender < 10 ? `0${minutesToRender}` : minutesToRender;
    const formattedSeconds = secondsToRender < 10 ? `0${secondsToRender}` : secondsToRender;

    timeElement.innerText = `${formattedMinutes}:${formattedSeconds}`;
  }
}
