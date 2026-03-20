/**
 * 操作函数
 */

import { state, sampleJson } from './config.js';
import { dom } from './dom.js';
import { formatJson, sortJsonKeys, updateStats } from './json-core.js';
import { renderTree, expandAll, collapseAll } from './tree-view.js';
import { renderOutput, clearOutput } from './view-toggle.js';
import { showError, hideError, showToast, copyToClipboard } from './utils.js';

export function performFormat() {
  const input = dom.inputJson.value.trim();
  if (!input) {
    showError('请输入 JSON 内容');
    return;
  }

  hideError();
  const startTime = performance.now();
  const result = formatJson(input, !state.isBeautifyMode);
  const endTime = performance.now();

  if (result.success) {
    state.isSorted = false;
    dom.sortIndicator.style.display = 'none';
    renderOutput();
    dom.formatTime.textContent = `格式化耗时: ${(endTime - startTime).toFixed(2)}ms`;
    dom.formatStatus.textContent = '✓ 成功';
    dom.formatStatus.style.color = 'var(--accent-green)';
  } else {
    showError(`JSON 解析错误: ${result.error}`);
    dom.formatStatus.textContent = '✕ 失败';
    dom.formatStatus.style.color = 'var(--accent-red)';
  }
}

export function performSort() {
  if (!state.currentData) {
    showToast('请先格式化 JSON', 'warning');
    return;
  }

  const startTime = performance.now();
  state.currentData = sortJsonKeys(state.currentData);
  const endTime = performance.now();

  renderOutput();
  state.currentRawOutput = state.isBeautifyMode
    ? JSON.stringify(state.currentData, null, 2)
    : JSON.stringify(state.currentData);

  state.isSorted = true;
  dom.sortIndicator.textContent = '(已排序)';
  dom.sortIndicator.style.display = 'inline';

  dom.formatTime.textContent = `排序耗时: ${(endTime - startTime).toFixed(2)}ms`;
  showToast('同级已按 ASCII 排序');
}

export function clearAll() {
  dom.inputJson.value = '';
  state.currentData = null;
  state.currentRawOutput = '';
  state.isSorted = false;
  clearOutput();
  dom.sortIndicator.style.display = 'none';
  hideError();
  updateStats(null);
  dom.formatTime.textContent = '';
  dom.formatStatus.textContent = '';
  dom.inputJson.focus();
}

export function loadSample() {
  dom.inputJson.value = JSON.stringify(sampleJson, null, 2);
  hideError();
  showToast('已加载示例 JSON');
}

export async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    dom.inputJson.value = text;
    hideError();
  } catch (e) {
    showToast('粘贴失败，请手动粘贴', 'error');
  }
}

export function copyOutput() {
  if (state.currentRawOutput) copyToClipboard(state.currentRawOutput);
}

export { expandAll, collapseAll };
