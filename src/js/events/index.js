import '../../pages/index.html';
import '../../styles/main.scss';

import TimerMenu from '../behaviors/timerMenu';
import Timer from '../behaviors/timer';
import SettingsModal from '../behaviors/settingsModal';

const timerMenuElement = document.querySelector('.menu__options');
const timerElement = document.querySelector('.timer');
const settingsModalElement = document.querySelector('.settings');
const firstSettingsButton = document.querySelector('.menu__button--switch');
const secondSettingsButton = document.querySelector('.switch__button');
const fontSetting = document.querySelector('.modal__fonts');
const colorSetting = document.querySelector('.modal__colors');

const timerMenu = new TimerMenu();
const timer = new Timer();
const settingsModal = new SettingsModal(settingsModalElement);

settingsModal.initialize();

// 'this' is bound on event listeners to avoid losing it
timerMenuElement.addEventListener('click', timerMenu.handleSwitch);
timerElement.addEventListener('click', timer.handler);
firstSettingsButton.addEventListener('click', settingsModal.displayModal.bind(settingsModal));
secondSettingsButton.addEventListener('click', settingsModal.displayModal.bind(settingsModal));
fontSetting.addEventListener('click', settingsModal.switchActiveButton);
colorSetting.addEventListener('click', settingsModal.switchActiveButton);
