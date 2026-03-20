/**
 * 树形视图渲染
 */

import { dom } from './dom.js';
import { escapeHtml, formatValue, getValueClass } from './utils.js';

export function createTreeNode(key, value, isArrayItem = false, depth = 0) {
  const node = document.createElement('div');
  node.className = 'tree-line';
  node.dataset.depth = depth;

  if (isArrayItem) {
    node.innerHTML = `
      <span class="tree-toggle hidden"></span>
      <span class="tree-value">${formatValue(value)}</span>
    `;
    return node;
  }

  if (typeof value === 'object' && value !== null) {
    const isArray = Array.isArray(value);
    const itemCount = isArray ? value.length : Object.keys(value).length;
    const bracketOpen = isArray ? '[' : '{';
    const bracketClose = isArray ? ']' : '}';

    node.innerHTML = `
      <span class="tree-toggle" data-collapsed="false">▼</span>
      <span class="tree-key">"${escapeHtml(key)}"</span>
      <span class="tree-colon">:</span>
      <span class="tree-bracket">${bracketOpen}</span>
      <span class="tree-count">${itemCount} ${isArray ? '项' : '键'}</span>
    `;

    const toggle = node.querySelector('.tree-toggle');
    const countSpan = node.querySelector('.tree-count');
    const childrenContainer = document.createElement('div');
    childrenContainer.className = 'tree-children';

    if (isArray) {
      value.forEach((item, index) => {
        childrenContainer.appendChild(createTreeNode(index, item, true, depth + 1));
      });
    } else {
      Object.keys(value).forEach(childKey => {
        childrenContainer.appendChild(createTreeNode(childKey, value[childKey], false, depth + 1));
      });
    }

    node.appendChild(childrenContainer);

    const closingBracket = document.createElement('div');
    closingBracket.className = 'tree-line';
    closingBracket.innerHTML = `
      <span class="tree-toggle hidden"></span>
      <span class="tree-bracket">${bracketClose}</span>
    `;

    toggle.addEventListener('click', () => {
      const collapsed = toggle.dataset.collapsed === 'true';
      toggle.dataset.collapsed = (!collapsed).toString();
      toggle.classList.toggle('collapsed', collapsed);
      childrenContainer.classList.toggle('collapsed', collapsed);
      countSpan.style.display = collapsed ? 'inline' : 'none';
    });

    childrenContainer.classList.toggle('collapsed', false);
    toggle.classList.toggle('collapsed', false);
  } else {
    node.innerHTML = `
      <span class="tree-toggle hidden"></span>
      <span class="tree-key">"${escapeHtml(key)}"</span>
      <span class="tree-colon">:</span>
      <span class="tree-value ${getValueClass(value)}">${formatValue(value, true)}</span>
    `;
  }

  return node;
}

export function renderTree(data) {
  dom.treeOutput.innerHTML = '';
  dom.emptyState.style.display = 'none';
  dom.treeOutput.style.display = 'block';
  dom.textOutput.style.display = 'none';

  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      dom.treeOutput.appendChild(createTreeNode(index, item, true, 0));
    });
  } else if (typeof data === 'object' && data !== null) {
    Object.keys(data).forEach(key => {
      dom.treeOutput.appendChild(createTreeNode(key, data[key], false, 0));
    });
  }
}

export function expandAll() {
  document.querySelectorAll('.tree-toggle').forEach(toggle => {
    if (!toggle.classList.contains('hidden')) {
      toggle.dataset.collapsed = 'false';
      toggle.classList.remove('collapsed');
      const children = toggle.closest('.tree-line').querySelector('.tree-children');
      if (children) children.classList.remove('collapsed');
      const countSpan = toggle.closest('.tree-line').querySelector('.tree-count');
      if (countSpan) countSpan.style.display = 'inline';
    }
  });
}

export function collapseAll() {
  document.querySelectorAll('.tree-toggle').forEach(toggle => {
    if (!toggle.classList.contains('hidden')) {
      toggle.dataset.collapsed = 'true';
      toggle.classList.add('collapsed');
      const children = toggle.closest('.tree-line').querySelector('.tree-children');
      if (children) children.classList.add('collapsed');
      const countSpan = toggle.closest('.tree-line').querySelector('.tree-count');
      if (countSpan) countSpan.style.display = 'none';
    }
  });
}
