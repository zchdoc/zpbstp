/**
 * 弹窗管理
 */

import { dom } from './dom.js';

export function initModal() {
  // 打开快捷键弹窗
  dom.shortcutsBtn.addEventListener('click', () => {
    dom.shortcutsOverlay.classList.add('visible');
  });

  // 点击遮罩关闭
  dom.shortcutsOverlay.addEventListener('click', (e) => {
    if (e.target === dom.shortcutsOverlay) {
      dom.shortcutsOverlay.classList.remove('visible');
    }
  });
}

export function closeModal() {
  dom.shortcutsOverlay.classList.remove('visible');
}

export function openModal() {
  dom.shortcutsOverlay.classList.add('visible');
}
