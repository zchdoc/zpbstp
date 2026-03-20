/**
 * JSON Formatter - 主应用入口
 */

import { dom } from './dom.js';
import { performFormat, performSort, clearAll, expandAll, collapseAll, copyOutput, loadSample, pasteFromClipboard } from './actions.js';
import { initFileHandler } from './file-handler.js';
import { initModeToggle } from './mode-toggle.js';
import { initModal } from './modal.js';
import { initKeyboard } from './keyboard.js';

function bindEvents() {
  // 主要操作
  dom.formatBtn.addEventListener('click', performFormat);
  dom.sortBtn.addEventListener('click', performSort);
  dom.expandAllBtn.addEventListener('click', expandAll);
  dom.collapseAllBtn.addEventListener('click', collapseAll);
  dom.clearBtn.addEventListener('click', clearAll);

  // 复制按钮
  dom.copyAllBtn.addEventListener('click', copyOutput);
  dom.copyBtn.addEventListener('click', copyOutput);
  dom.copyRawBtn.addEventListener('click', copyOutput);

  // 粘贴和示例
  dom.pasteBtn.addEventListener('click', pasteFromClipboard);
  dom.loadSampleBtn.addEventListener('click', loadSample);

  // 初始化各模块
  initModeToggle();
  initFileHandler();
  initModal();
  initKeyboard();
}

function init() {
  bindEvents();
  dom.inputJson.focus();
}

document.addEventListener('DOMContentLoaded', init);
