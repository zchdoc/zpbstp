/**
 * 工具函数
 */

import { dom } from './dom.js';

export function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

export function getValueClass(value) {
  if (value === null) return 'null';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') return 'string';
  return '';
}

export function formatValue(value, isLong = false) {
  if (value === null) return '<span class="null">null</span>';
  if (typeof value === 'boolean') return `<span class="boolean">${value}</span>`;
  if (typeof value === 'number') return `<span class="number">${value}</span>`;
  if (typeof value === 'string') {
    const displayValue = isLong && value.length > 100 ? value.substring(0, 100) + '...' : value;
    return `<span class="string">"${escapeHtml(displayValue)}"</span>`;
  }
  return '';
}

export function showError(msg) {
  dom.errorMessage.textContent = msg;
  dom.inputError.classList.add('visible');
}

export function hideError() {
  dom.inputError.classList.remove('visible');
}

export function showToast(message, type = 'success') {
  const icons = { success: '✓', error: '⚠', warning: '⚠' };
  dom.toast.querySelector('.toast-icon').textContent = icons[type] || '✓';
  dom.toast.querySelector('.toast-message').textContent = message;
  dom.toast.className = `toast visible ${type}`;
  setTimeout(() => dom.toast.classList.remove('visible'), 2000);
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('已复制到剪贴板');
  } catch (e) {
    showToast('复制失败', 'error');
  }
}
