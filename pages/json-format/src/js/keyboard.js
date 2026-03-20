/**
 * 键盘快捷键
 */

import { dom } from './dom.js';
import { performFormat, performSort, clearAll, expandAll, collapseAll, copyOutput } from './actions.js';
import { closeModal, openModal } from './modal.js';

export function initKeyboard() {
  document.addEventListener('keydown', (e) => {
    // Ctrl + Enter: 格式化
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      performFormat();
    }
    // Ctrl + S: 排序
    else if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      performSort();
    }
    // Ctrl + Shift + C: 复制
    else if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      copyOutput();
    }
    // Ctrl + L: 清空
    else if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      clearAll();
    }
    // Ctrl + ]: 展开全部
    else if (e.ctrlKey && e.key === ']') {
      e.preventDefault();
      expandAll();
    }
    // Ctrl + [: 折叠全部
    else if (e.ctrlKey && e.key === '[') {
      e.preventDefault();
      collapseAll();
    }
    // ?: 打开快捷键（不在输入框时）
    else if (e.key === '?' && !e.ctrlKey && !e.shiftKey) {
      const activeElement = document.activeElement;
      if (activeElement !== dom.inputJson) {
        openModal();
      }
    }
    // Esc: 关闭弹窗
    else if (e.key === 'Escape') {
      closeModal();
    }
  });
}
