/**
 * JSON Formatter - 主应用逻辑
 */

// ==================== 状态 ====================
const state = {
  isBeautifyMode: true,
  currentData: null,
  currentRawOutput: '',
  isSorted: false
};

// ==================== 示例数据 ====================
const sampleJson = {
  "z_key": "D9mCnRmtEYhi0tAupmQnhjdB8TlRWRWMt1ZKM2GQPlu0X1uVXuPqrbxkat2mAa1imoLqmI4n0I44DdCv9bBYqV5LuNUaRD8ApruyCyIIzEXsg5BUNp8sRwFp4q0cKEyMQPOmg0vc88kVYgHAYiudqDIjMS3dGWKhmcoqldzK31Hlv5XuSw9Zt3zwAIjjniXwPnpxatRg0OJItI45JQXKpql1lMIsMtYn586lKqNKHwKGgZ4I6JGnoWQ7JKI3flISHRLF0n/rBj44PmVqYijAO986aAWI298nGisW+MDUdd0tTsYVzXV0AG9/q2Ip/WC6xcOMufGEczkzb2opXnJVCw==",
  "resp_code": "10000",
  "resp_msg": "请求成功",
  "resp_params": JSON.stringify({
    "wallet_act_info": {
      "wallet_act_no": "12602260000099579054",
      "wallet_act_balance": "0",
      "entity_card_no": "3569867843",
      "wallet_canbu_balance": "0"
    },
    "out_user_no": "61103679268260226165809030739139",
    "user_info": {
      "cert_no_secured": "",
      "cert_type": "0",
      "cert_no": "",
      "user_name": "罗世增",
      "campus": "0",
      "sex": "1",
      "class_id": "0",
      "class_admin_name": "",
      "face_user_id": "",
      "user_role": "1",
      "update_time": "2026-02-26 17:00:30",
      "user_mobile": "18878875434",
      "school_account": "2021030",
      "attach": "",
      "class_name": ""
    },
    "third_user_id": ""
  }),
  "a_item": "test",
  "number_test": 12345
};

// ==================== DOM 元素 ====================
const dom = {
  inputJson: document.getElementById('inputJson'),
  treeOutput: document.getElementById('treeOutput'),
  emptyState: document.getElementById('emptyState'),
  treeWrapper: document.getElementById('treeWrapper'),
  formatBtn: document.getElementById('formatBtn'),
  sortBtn: document.getElementById('sortBtn'),
  expandAllBtn: document.getElementById('expandAllBtn'),
  collapseAllBtn: document.getElementById('collapseAllBtn'),
  copyAllBtn: document.getElementById('copyAllBtn'),
  clearBtn: document.getElementById('clearBtn'),
  copyBtn: document.getElementById('copyBtn'),
  copyRawBtn: document.getElementById('copyRawBtn'),
  pasteBtn: document.getElementById('pasteBtn'),
  loadSampleBtn: document.getElementById('loadSampleBtn'),
  importBtn: document.getElementById('importBtn'),
  exportBtn: document.getElementById('exportBtn'),
  shortcutsBtn: document.getElementById('shortcutsBtn'),
  shortcutsOverlay: document.getElementById('shortcutsOverlay'),
  beautifyMode: document.getElementById('beautifyMode'),
  minifyMode: document.getElementById('minifyMode'),
  inputError: document.getElementById('inputError'),
  errorMessage: document.getElementById('errorMessage'),
  fileInput: document.getElementById('fileInput'),
  toast: document.getElementById('toast'),
  sortIndicator: document.getElementById('sortIndicator'),
  keyCount: document.getElementById('keyCount'),
  maxDepth: document.getElementById('maxDepth'),
  charCount: document.getElementById('charCount'),
  formatTime: document.getElementById('formatTime'),
  formatStatus: document.getElementById('formatStatus')
};

// ==================== JSON 核心功能 ====================

/**
 * 深度解析 JSON（处理转义字符）
 */
function deepFormatJson(obj) {
  if (typeof obj === 'string') {
    try {
      const parsed = JSON.parse(obj);
      return deepFormatJson(parsed);
    } catch (e) {
      return obj;
    }
  } else if (Array.isArray(obj)) {
    return obj.map(item => deepFormatJson(item));
  } else if (obj && typeof obj === 'object') {
    const result = {};
    for (const key in obj) {
      result[key] = deepFormatJson(obj[key]);
    }
    return result;
  }
  return obj;
}

/**
 * JSON 格式化/压缩
 */
function formatJson(input, minify = false) {
  try {
    let data = JSON.parse(input);
    data = deepFormatJson(data);
    updateStats(data);
    state.currentData = data;
    const output = minify ? JSON.stringify(data) : JSON.stringify(data, null, 2);
    state.currentRawOutput = output;
    return { success: true, output, error: null };
  } catch (e) {
    return { success: false, output: '', error: e.message };
  }
}

/**
 * JSON 同级排序（ASCII）
 */
function sortJsonKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map(item => sortJsonKeys(item));
  } else if (obj && typeof obj === 'object') {
    const sorted = {};
    Object.keys(obj).sort((a, b) => a.localeCompare(b)).forEach(key => {
      sorted[key] = sortJsonKeys(obj[key]);
    });
    return sorted;
  }
  return obj;
}

/**
 * 获取 JSON 统计信息
 */
function getJsonStats(obj, depth = 0) {
  let keys = 0;
  let maxD = depth;
  if (obj && typeof obj === 'object') {
    const objKeys = Object.keys(obj);
    keys = objKeys.length;
    objKeys.forEach(key => {
      const result = getJsonStats(obj[key], depth + 1);
      keys += result.keys;
      maxD = Math.max(maxD, result.maxDepth);
    });
  }
  return { keys, maxDepth: maxD };
}

function updateStats(obj) {
  if (obj) {
    const stats = getJsonStats(obj);
    dom.keyCount.textContent = stats.keys;
    dom.maxDepth.textContent = stats.maxDepth;
    dom.charCount.textContent = JSON.stringify(obj).length;
  } else {
    dom.keyCount.textContent = '0';
    dom.maxDepth.textContent = '0';
    dom.charCount.textContent = '0';
  }
}

// ==================== 工具函数 ====================

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function getValueClass(value) {
  if (value === null) return 'null';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') return 'string';
  return '';
}

function formatValue(value, isLong = false) {
  if (value === null) return '<span class="null">null</span>';
  if (typeof value === 'boolean') return `<span class="boolean">${value}</span>`;
  if (typeof value === 'number') return `<span class="number">${value}</span>`;
  if (typeof value === 'string') {
    const displayValue = isLong && value.length > 100 ? value.substring(0, 100) + '...' : value;
    return `<span class="string">"${escapeHtml(displayValue)}"</span>`;
  }
  return '';
}

function showError(msg) {
  dom.errorMessage.textContent = msg;
  dom.inputError.classList.add('visible');
}

function hideError() {
  dom.inputError.classList.remove('visible');
}

function showToast(message, type = 'success') {
  const icons = { success: '✓', error: '⚠', warning: '⚠' };
  dom.toast.querySelector('.toast-icon').textContent = icons[type] || '✓';
  dom.toast.querySelector('.toast-message').textContent = message;
  dom.toast.className = `toast visible ${type}`;
  setTimeout(() => dom.toast.classList.remove('visible'), 2000);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('已复制到剪贴板');
  } catch (e) {
    showToast('复制失败', 'error');
  }
}

// ==================== 树形视图 ====================

function createTreeNode(key, value, isArrayItem = false, depth = 0) {
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

function renderTree(data) {
  dom.treeOutput.innerHTML = '';
  dom.emptyState.style.display = 'none';
  dom.treeOutput.style.display = 'block';

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

function expandAll() {
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

function collapseAll() {
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

// ==================== 操作 ====================

function performFormat() {
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
    renderTree(state.currentData);
    dom.formatTime.textContent = `格式化耗时: ${(endTime - startTime).toFixed(2)}ms`;
    dom.formatStatus.textContent = '✓ 成功';
    dom.formatStatus.style.color = 'var(--accent-green)';
  } else {
    showError(`JSON 解析错误: ${result.error}`);
    dom.formatStatus.textContent = '✕ 失败';
    dom.formatStatus.style.color = 'var(--accent-red)';
  }
}

function performSort() {
  if (!state.currentData) {
    showToast('请先格式化 JSON', 'warning');
    return;
  }

  const startTime = performance.now();
  state.currentData = sortJsonKeys(state.currentData);
  const endTime = performance.now();

  renderTree(state.currentData);
  state.currentRawOutput = state.isBeautifyMode 
    ? JSON.stringify(state.currentData, null, 2) 
    : JSON.stringify(state.currentData);
  dom.treeOutput.dataset.raw = state.currentRawOutput;

  state.isSorted = true;
  dom.sortIndicator.textContent = '(已排序)';
  dom.sortIndicator.style.display = 'inline';

  dom.formatTime.textContent = `排序耗时: ${(endTime - startTime).toFixed(2)}ms`;
  showToast('同级已按 ASCII 排序');
}

function clearAll() {
  dom.inputJson.value = '';
  state.currentData = null;
  state.currentRawOutput = '';
  state.isSorted = false;
  dom.sortIndicator.style.display = 'none';
  dom.treeOutput.innerHTML = '';
  dom.treeOutput.style.display = 'none';
  dom.emptyState.style.display = 'flex';
  hideError();
  updateStats(null);
  dom.formatTime.textContent = '';
  dom.formatStatus.textContent = '';
  dom.inputJson.focus();
}

// ==================== 事件绑定 ====================

function bindEvents() {
  // 主要操作
  dom.formatBtn.addEventListener('click', performFormat);
  dom.sortBtn.addEventListener('click', performSort);
  dom.expandAllBtn.addEventListener('click', expandAll);
  dom.collapseAllBtn.addEventListener('click', collapseAll);
  dom.clearBtn.addEventListener('click', clearAll);

  // 复制
  dom.copyAllBtn.addEventListener('click', () => {
    if (state.currentRawOutput) copyToClipboard(state.currentRawOutput);
  });
  dom.copyBtn.addEventListener('click', () => {
    if (state.currentRawOutput) copyToClipboard(state.currentRawOutput);
  });
  dom.copyRawBtn.addEventListener('click', () => {
    if (state.currentRawOutput) copyToClipboard(state.currentRawOutput);
  });

  // 粘贴
  dom.pasteBtn.addEventListener('click', async () => {
    try {
      const text = await navigator.clipboard.readText();
      dom.inputJson.value = text;
      hideError();
    } catch (e) {
      showToast('粘贴失败，请手动粘贴', 'error');
    }
  });

  // 加载示例
  dom.loadSampleBtn.addEventListener('click', () => {
    dom.inputJson.value = JSON.stringify(sampleJson, null, 2);
    hideError();
    showToast('已加载示例 JSON');
  });

  // 模式切换
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

  // 文件导入/导出
  dom.importBtn.addEventListener('click', () => dom.fileInput.click());

  dom.fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        dom.inputJson.value = event.target.result;
        hideError();
        showToast(`已导入: ${file.name}`);
      };
      reader.readAsText(file);
      dom.fileInput.value = '';
    }
  });

  dom.exportBtn.addEventListener('click', () => {
    if (!state.currentRawOutput) {
      showToast('没有可导出的内容', 'error');
      return;
    }
    const blob = new Blob([state.currentRawOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('已导出: formatted.json');
  });

  // 快捷键弹窗
  dom.shortcutsBtn.addEventListener('click', () => dom.shortcutsOverlay.classList.add('visible'));
  dom.shortcutsOverlay.addEventListener('click', (e) => {
    if (e.target === dom.shortcutsOverlay) dom.shortcutsOverlay.classList.remove('visible');
  });

  // 键盘快捷键
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      performFormat();
    }
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      performSort();
    }
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
      e.preventDefault();
      if (state.currentRawOutput) copyToClipboard(state.currentRawOutput);
    }
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault();
      clearAll();
    }
    if (e.ctrlKey && e.key === ']') {
      e.preventDefault();
      expandAll();
    }
    if (e.ctrlKey && e.key === '[') {
      e.preventDefault();
      collapseAll();
    }
    if (e.key === '?' && !e.ctrlKey && !e.shiftKey) {
      const activeElement = document.activeElement;
      if (activeElement !== dom.inputJson) {
        dom.shortcutsOverlay.classList.add('visible');
      }
    }
    if (e.key === 'Escape') {
      dom.shortcutsOverlay.classList.remove('visible');
    }
  });
}

// ==================== 初始化 ====================

function init() {
  bindEvents();
  dom.inputJson.focus();
}

document.addEventListener('DOMContentLoaded', init);
