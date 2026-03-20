/**
 * 模式切换
 */

import { dom } from './dom.js';
import { state } from './config.js';

export function initModeToggle() {
  dom.beautifyMode.addEventListener('click', () => {
    state.isBeautifyMode = true;
    dom.beautifyMode.classList.add('active');
    dom.minifyMode.classList.remove('active');
    if (state.currentData) {
      state.currentRawOutput = JSON.stringify(state.currentData, null, 2);
    }
  });

  dom.minifyMode.addEventListener('click', () => {
    state.isBeautifyMode = false;
    dom.minifyMode.classList.add('active');
    dom.beautifyMode.classList.remove('active');
    if (state.currentData) {
      state.currentRawOutput = JSON.stringify(state.currentData);
    }
  });
}
