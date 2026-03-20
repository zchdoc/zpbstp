/**
 * 视图模式切换 - 树状结构 / 文本视图
 */

import { dom } from './dom.js';
import { state } from './config.js';
import { renderTree } from './tree-view.js';

export function initViewToggle() {
  dom.treeViewMode.addEventListener('click', () => {
    setViewMode('tree');
  });

  dom.textViewMode.addEventListener('click', () => {
    setViewMode('text');
  });
}

export function setViewMode(mode) {
  state.viewMode = mode;

  // 更新按钮状态
  if (mode === 'tree') {
    dom.treeViewMode.classList.add('active');
    dom.textViewMode.classList.remove('active');
  } else {
    dom.textViewMode.classList.add('active');
    dom.treeViewMode.classList.remove('active');
  }

  // 如果有数据，重新渲染
  if (state.currentData) {
    renderOutput();
  }
}

export function renderOutput() {
  if (state.viewMode === 'tree') {
    renderTree(state.currentData);
  } else {
    renderTextView();
  }
}

function renderTextView() {
  dom.emptyState.style.display = 'none';
  dom.treeOutput.style.display = 'none';
  dom.textOutput.style.display = 'block';

  const formattedJson = state.isBeautifyMode
    ? JSON.stringify(state.currentData, null, 2)
    : JSON.stringify(state.currentData);

  dom.textOutput.querySelector('code').textContent = formattedJson;
}

export function clearOutput() {
  dom.treeOutput.innerHTML = '';
  dom.textOutput.querySelector('code').textContent = '';
  dom.treeOutput.style.display = 'none';
  dom.textOutput.style.display = 'none';
  dom.emptyState.style.display = 'flex';
}
