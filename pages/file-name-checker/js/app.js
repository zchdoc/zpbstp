/**
 * app.js
 * 文件名校验工具 - 主应用逻辑
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  var currentSegments = [];
  var isScanning = false;

  // DOM 元素
  var els = {
    segmentExampleInput: document.getElementById('segmentExampleInput'),
    autoSplitBtn: document.getElementById('autoSplitBtn'),
    segmentEditor: document.getElementById('segmentEditor'),
    segmentList: document.getElementById('segmentList'),
    addSegmentBtn: document.getElementById('addSegmentBtn'),
    segmentPreview: document.getElementById('segmentPreview'),
    segmentPreviewBox: document.getElementById('segmentPreviewBox'),
    extInput: document.getElementById('extInput'),
    selectDirBtn: document.getElementById('selectDirBtn'),
    fileInput: document.getElementById('fileInput'),
    resultSection: document.getElementById('resultSection'),
    resultSummary: document.getElementById('resultSummary'),
    validList: document.getElementById('validList'),
    invalidList: document.getElementById('invalidList'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    validTabBtn: document.getElementById('validTabBtn'),
    invalidTabBtn: document.getElementById('invalidTabBtn'),
    validTabPane: document.getElementById('validTab'),
    invalidTabPane: document.getElementById('invalidTab'),
  };

  // ========== 事件绑定 ==========

  els.autoSplitBtn.addEventListener('click', handleAutoSplit);
  els.addSegmentBtn.addEventListener('click', handleAddSegment);
  els.selectDirBtn.addEventListener('click', handleSelectDir);
  els.fileInput.addEventListener('change', handleFileInput);
  els.validTabBtn.addEventListener('click', function () { switchTab('valid'); });
  els.invalidTabBtn.addEventListener('click', function () { switchTab('invalid'); });

  // 回车键触发自动拆分
  els.segmentExampleInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') handleAutoSplit();
  });

  // ========== 分段编辑器 ==========

  function handleAutoSplit() {
    var example = els.segmentExampleInput.value.trim();
    if (!example) {
      showToast('请输入文件名示例', 'warning');
      els.segmentExampleInput.focus();
      return;
    }

    var result = FileNameTemplateParser.splitExampleToSegments(example);
    if (result.error) {
      showToast(result.error, 'danger');
      return;
    }

    currentSegments = result.segments;
    renderSegmentList();
    els.segmentEditor.style.display = 'block';
    els.segmentPreview.style.display = 'block';
    updateSegmentPreview();

    showToast('自动拆分完成，共 ' + currentSegments.length + ' 个分段', 'success');
  }

  function renderSegmentList() {
    els.segmentList.innerHTML = '';
    for (var i = 0; i < currentSegments.length; i++) {
      var row = createSegmentRow(i, currentSegments[i]);
      els.segmentList.appendChild(row);
    }
  }

  var TYPE_CYCLE = ['fixed', 'var', 'regex'];
  var TYPE_LABELS = { fixed: '固定值', var: '可变值', regex: '正则值' };
  var TYPE_CLASSES = { fixed: 'fixed', var: 'var', regex: 'regex' };
  var TYPE_PLACEHOLDERS = {
    fixed: '输入固定内容',
    var: '示例内容（校验时忽略）',
    regex: '示例内容（校验时忽略）'
  };

  function createSegmentRow(index, segment) {
    var div = document.createElement('div');
    div.className = 'segment-row';
    div.dataset.index = index;
    var num = String(index + 1).padStart(2, '0');
    var t = segment.type || 'fixed';

    var showRegex = t === 'regex';
    div.innerHTML =
      '<span class="segment-num">第' + num + '部分</span>' +
      '<button type="button" class="segment-type-btn ' + TYPE_CLASSES[t] + '">' + TYPE_LABELS[t] + '</button>' +
      '<input type="text" class="segment-input form-control" value="' + escapeHtml(segment.value || '') + '"' +
      ' placeholder="' + TYPE_PLACEHOLDERS[t] + '">' +
      '<input type="text" class="segment-regex-input form-control' + (showRegex ? '' : ' hidden') + '"' +
      ' value="' + escapeHtml(segment.pattern || '') + '" placeholder="正则规则，如：教案|课件">' +
      '<button type="button" class="segment-action-btn segment-up" title="上移">↑</button>' +
      '<button type="button" class="segment-action-btn segment-down" title="下移">↓</button>' +
      '<button type="button" class="segment-action-btn segment-insert" title="在此后插入">+</button>' +
      '<button type="button" class="segment-delete" title="删除">×</button>';

    var typeBtn = div.querySelector('.segment-type-btn');
    var input = div.querySelector('.segment-input');
    var regexInput = div.querySelector('.segment-regex-input');

    typeBtn.addEventListener('click', function () {
      var seg = currentSegments[index];
      var ci = TYPE_CYCLE.indexOf(seg.type || 'fixed');
      seg.type = TYPE_CYCLE[(ci + 1) % TYPE_CYCLE.length];
      var nt = seg.type;
      typeBtn.className = 'segment-type-btn ' + TYPE_CLASSES[nt];
      typeBtn.textContent = TYPE_LABELS[nt];
      input.placeholder = TYPE_PLACEHOLDERS[nt];
      regexInput.classList.toggle('hidden', nt !== 'regex');
      updateSegmentPreview();
    });

    input.addEventListener('input', function () {
      currentSegments[index].value = input.value;
      updateSegmentPreview();
    });

    regexInput.addEventListener('input', function () {
      currentSegments[index].pattern = regexInput.value;
      updateSegmentPreview();
    });

    div.querySelector('.segment-delete').addEventListener('click', function () {
      currentSegments.splice(index, 1);
      renderSegmentList();
      updateSegmentPreview();
    });

    div.querySelector('.segment-insert').addEventListener('click', function () {
      currentSegments.splice(index + 1, 0, { type: 'fixed', value: '' });
      renderSegmentList();
      updateSegmentPreview();
    });

    div.querySelector('.segment-up').addEventListener('click', function () {
      if (index <= 0) return;
      var tmp = currentSegments[index];
      currentSegments[index] = currentSegments[index - 1];
      currentSegments[index - 1] = tmp;
      renderSegmentList();
      updateSegmentPreview();
    });

    div.querySelector('.segment-down').addEventListener('click', function () {
      if (index >= currentSegments.length - 1) return;
      var tmp = currentSegments[index];
      currentSegments[index] = currentSegments[index + 1];
      currentSegments[index + 1] = tmp;
      renderSegmentList();
      updateSegmentPreview();
    });

    return div;
  }

  function updateSegmentPreview() {
    els.segmentPreviewBox.innerHTML = FileNameTemplateParser.renderSegmentsToHTML(currentSegments);
  }

  function handleAddSegment() {
    currentSegments.push({ type: 'fixed', value: '' });
    renderSegmentList();
    updateSegmentPreview();
  }

  function handleSelectDir() {
    if (currentSegments.length === 0) {
      showToast('请先在「步骤1」中定义模板分段', 'warning');
      els.segmentExampleInput.focus();
      return;
    }

    // 优先使用 webkitdirectory（无权限弹窗，用户体验更好）
    if ('webkitdirectory' in els.fileInput || 'directory' in els.fileInput) {
      els.fileInput.click();
    } else if ('showDirectoryPicker' in window) {
      startDirectoryPicker();
    } else {
      showToast('当前浏览器不支持文件夹选择', 'danger');
    }
  }

  function handleFileInput(e) {
    var files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    var exts = getExtensions();
    var filtered = files
      .filter(function (f) {
        var ext = '';
        var lastDot = f.name.lastIndexOf('.');
        if (lastDot > 0) {
          ext = f.name.slice(lastDot + 1).toLowerCase();
        }
        return exts.indexOf(ext) !== -1;
      })
      .map(function (f) {
        return { name: f.name, path: f.webkitRelativePath || f.name };
      });

    processFiles(filtered);
  }

  async function startDirectoryPicker() {
    try {
      var dirHandle = await window.showDirectoryPicker();
      var exts = getExtensions();

      setLoading(true);
      var files = await scanDirectory(dirHandle, exts);
      setLoading(false);

      processFiles(files);
    } catch (err) {
      setLoading(false);
      if (err.name === 'AbortError') {
        // 用户取消，不处理
      } else if (err.name === 'SecurityError') {
        showToast('当前环境不支持文件夹选择，请使用 Live Server 运行', 'warning');
      } else {
        showToast('选择文件夹失败：' + err.message, 'danger');
      }
    }
  }

  async function scanDirectory(dirHandle, exts) {
    var files = [];
    var queue = [dirHandle];

    while (queue.length > 0) {
      var current = queue.shift();

      try {
        for await (var entry of current.values()) {
          if (entry.kind === 'file') {
            var ext = '';
            var lastDot = entry.name.lastIndexOf('.');
            if (lastDot > 0) {
              ext = entry.name.slice(lastDot + 1).toLowerCase();
            }
            if (exts.indexOf(ext) !== -1) {
              files.push({ name: entry.name, path: entry.name });
            }
          } else if (entry.kind === 'directory') {
            queue.push(entry);
          }
        }
      } catch (err) {
        console.warn('读取目录失败:', err);
      }
    }

    return files;
  }

  function getExtensions() {
    var val = els.extInput.value;
    return val.split(/[,，]/).map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean);
  }

  function processFiles(files) {
    if (files.length === 0) {
      showToast('未找到符合要求的文件', 'info');
      els.resultSection.style.display = 'none';
      return;
    }

    var results = files.map(function (file) {
      var result = FileNameValidator.validateWithSegments(file.name, currentSegments);
      return {
        name: file.name,
        path: file.path || file.name,
        valid: result.valid,
        reason: result.reason,
        matches: result.matches || []
      };
    });

    displayResults(results);
  }

  /**
   * 检测匹配详情中是否有异常（如可变段匹配到特殊字符开头的内容）
   */
  function detectAnomalies(matches) {
    var anomalies = [];
    if (!matches) return anomalies;
    for (var i = 0; i < matches.length; i++) {
      var m = matches[i];
      if ((m.type === 'var' || m.type === 'regex') && m.matched) {
        // 检测是否以明显异常的特殊字符开头
        if (/^[~._\-]+$/.test(m.matched[0])) {
          anomalies.push({
            index: i,
            message: '第' + (i + 1) + '部分以特殊字符「' + m.matched[0] + '」开头，建议设为固定值或正则值'
          });
        }
      }
    }
    return anomalies;
  }

  function renderMatchDetail(matches, anomalies) {
    if (!matches || matches.length === 0) return '';
    var anomalyIdx = {};
    for (var a = 0; a < anomalies.length; a++) {
      anomalyIdx[anomalies[a].index] = anomalies[a].message;
    }

    var html = '<div class="match-detail">';
    for (var i = 0; i < matches.length; i++) {
      var m = matches[i];
      var typeLabel = m.type === 'fixed' ? '固定' : (m.type === 'regex' ? '正则' : '可变');
      var typeClass = m.type === 'fixed' ? 'match-fixed' : (m.type === 'regex' ? 'match-regex' : 'match-var');
      var warning = anomalyIdx[i] ? '<span class="match-warning" title="' + escapeHtml(anomalyIdx[i]) + '">⚠</span>' : '';
      html +=
        '<div class="match-item ' + typeClass + '">' +
        '<span class="match-index">' + (i + 1) + '</span>' +
        '<span class="match-type">' + typeLabel + '</span>' +
        '<span class="match-content">' + escapeHtml(m.matched || '') + '</span>' +
        warning +
        '</div>';
    }
    html += '</div>';
    return html;
  }

  function displayResults(results) {
    var validFiles = results.filter(function (r) { return r.valid; });
    var invalidFiles = results.filter(function (r) { return !r.valid; });

    // 统计
    els.resultSummary.innerHTML =
      '<div class="row">' +
      '<div class="col-md-4">' +
      '<div class="stat-card total">' +
      '<span class="stat-number">' + results.length + '</span>' +
      '<span class="stat-label">共找到文件</span>' +
      '</div></div>' +
      '<div class="col-md-4">' +
      '<div class="stat-card valid">' +
      '<span class="stat-number">' + validFiles.length + '</span>' +
      '<span class="stat-label">合规文件</span>' +
      '</div></div>' +
      '<div class="col-md-4">' +
      '<div class="stat-card invalid">' +
      '<span class="stat-number">' + invalidFiles.length + '</span>' +
      '<span class="stat-label">不合规文件</span>' +
      '</div></div>' +
      '</div>';

    // 合规列表
    if (validFiles.length > 0) {
      els.validList.innerHTML = validFiles.map(function (f, idx) {
        var anomalies = detectAnomalies(f.matches);
        var warnIcon = anomalies.length > 0 ? '<span class="file-warn" title="' + escapeHtml(anomalies.map(function(a){return a.message;}).join('\n')) + '">!</span>' : '';
        var detailId = 'vd-' + idx;
        var detailHtml = renderMatchDetail(f.matches, anomalies);
        return '<li class="list-group-item valid-item">' +
          '<span class="file-icon">OK</span>' +
          '<span class="file-name">' + escapeHtml(f.name) + '</span>' +
          warnIcon +
          (detailHtml ? '<button type="button" class="match-toggle" onclick="toggleMatchDetail(\'' + detailId + '\')">匹配详情</button>' : '') +
          '<div id="' + detailId + '" class="match-detail-wrap" style="display:none;">' + detailHtml + '</div>' +
          '</li>';
      }).join('');
    } else {
      els.validList.innerHTML = '<li class="list-group-item empty-state">暂无合规文件</li>';
    }

    // 不合规列表
    if (invalidFiles.length > 0) {
      els.invalidList.innerHTML = invalidFiles.map(function (f, idx) {
        var anomalies = detectAnomalies(f.matches);
        var detailId = 'id-' + idx;
        var detailHtml = renderMatchDetail(f.matches, anomalies);
        return '<li class="list-group-item invalid-item">' +
          '<span class="file-icon">!</span>' +
          '<span class="file-name">' + escapeHtml(f.name) + '</span>' +
          '<div class="invalid-reason">' + escapeHtml(f.reason) + '</div>' +
          (detailHtml ? '<button type="button" class="match-toggle" onclick="toggleMatchDetail(\'' + detailId + '\')">匹配详情</button>' : '') +
          '<div id="' + detailId + '" class="match-detail-wrap" style="display:none;">' + detailHtml + '</div>' +
          '</li>';
      }).join('');
    } else {
      els.invalidList.innerHTML = '<li class="list-group-item empty-state">太棒了，没有不合规文件</li>';
    }

    els.resultSection.style.display = 'block';

    // 自动切换到不合规标签页（如果有不合规文件）
    if (invalidFiles.length > 0) {
      switchTab('invalid');
    } else {
      switchTab('valid');
    }

    setTimeout(function () {
      els.resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  function switchTab(tab) {
    if (tab === 'valid') {
      els.validTabBtn.classList.add('active');
      els.invalidTabBtn.classList.remove('active');
      els.validTabPane.classList.add('show', 'active');
      els.invalidTabPane.classList.remove('show', 'active');
    } else {
      els.validTabBtn.classList.remove('active');
      els.invalidTabBtn.classList.add('active');
      els.validTabPane.classList.remove('show', 'active');
      els.invalidTabPane.classList.add('show', 'active');
    }
  }

  function setLoading(show) {
    isScanning = show;
    els.selectDirBtn.disabled = show;
    els.selectDirBtn.innerHTML = show
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14l4 4v10a2 2 0 0 1-2 2h-2"/><path d="M2 10h20"/></svg> 正在扫描文件夹...'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14l4 4v10a2 2 0 0 1-2 2h-2"/><path d="M2 10h20"/></svg> 选择文件夹';
    els.loadingOverlay.style.display = show ? 'flex' : 'none';
  }

  function showToast(message, type) {
    var toast = document.createElement('div');
    toast.className = 'alert alert-' + type + ' alert-tip';
    toast.style.cssText = 'position:fixed;top:20px;right:20px;z-index:9999;min-width:280px;box-shadow:0 4px 12px rgba(0,0,0,0.1);';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s';
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 500);
    }, 3000);
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 暴露到全局供 onclick 调用
  window.toggleMatchDetail = function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.style.display = el.style.display === 'none' ? 'block' : 'none';
    }
  };
});
