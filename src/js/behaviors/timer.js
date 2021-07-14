export default class Timer {
  constructor(domElement) {
    this.domElement = domElement;
  }

  initialize() {}

  handler() {}

  created() {}

  running() {}

  paused() {}

  finished() {}

  renderTime() {}

  renderProgressBar() {}

  renderStatus() {}

  render() {
    this.renderTime();
    this.renderProgressBar();
    this.renderStatus();
  }
}
