/**
 * template-parser.js
 * 模板解析器：从示例文件名中提取格式模板
 */

(function (global) {
  'use strict';

  // 支持的成对符号
  var PAIRS = {
    '（': '）',
    '《': '》',
    '「': '」',
    '『': '』',
    '【': '】',
    '［': '］',
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
  };

  var CLOSE_TO_OPEN = {};
  for (var open in PAIRS) {
    if (PAIRS.hasOwnProperty(open)) {
      CLOSE_TO_OPEN[PAIRS[open]] = open;
    }
  }

  /**
   * 去除文件扩展名
   */
  function removeExtension(filename) {
    var lastDot = filename.lastIndexOf('.');
    return lastDot > 0 ? filename.slice(0, lastDot) : filename;
  }

  /**
   * 从示例文件名提取模板
   * @param {string} example - 示例文件名
   * @returns {object} {template: Array, error: string|null}
   */
  function extractTemplate(example) {
    var name = removeExtension(example).trim();
    if (!name) {
      return { template: null, error: '文件名不能为空' };
    }

    var template = [];
    var stack = [];
    var currentText = '';
    var i;

    for (i = 0; i < name.length; i++) {
      var ch = name[i];

      if (PAIRS[ch]) {
        // 开符号
        if (currentText) {
          template.push({ type: 'text', content: currentText });
          currentText = '';
        }
        stack.push({ char: ch, pos: i });
        template.push({ type: 'open', char: ch });
      } else if (CLOSE_TO_OPEN[ch]) {
        // 闭符号
        var last = stack[stack.length - 1];
        if (last && PAIRS[last.char] === ch) {
          stack.pop();
          if (currentText) {
            template.push({ type: 'text', content: currentText });
            currentText = '';
          }
          template.push({ type: 'close', char: ch, matchedOpen: last.char });
        } else {
          // 不匹配的闭符号，当作普通文本
          currentText += ch;
        }
      } else {
        currentText += ch;
      }
    }

    if (currentText) {
      template.push({ type: 'text', content: currentText });
    }

    // 检查未闭合的符号
    if (stack.length > 0) {
      var unclosedChars = stack.map(function (s) { return s.char; });
      return {
        template: null,
        error: '示例文件名中有未闭合的符号：' + unclosedChars.join('、') + '，请检查输入'
      };
    }

    // 合并 open-text-close 为 pair
    var merged = [];
    i = 0;
    while (i < template.length) {
      if (template[i].type === 'open') {
        var openChar = template[i].char;
        var closeChar = PAIRS[openChar];
        var j = i + 1;
        var depth = 1;
        var contentTokens = [];

        while (j < template.length && depth > 0) {
          if (template[j].type === 'open') {
            depth++;
          } else if (template[j].type === 'close') {
            depth--;
          }
          if (depth > 0) {
            contentTokens.push(template[j]);
          }
          j++;
        }

        if (depth === 0) {
          var contentParts = [];
          for (var k = 0; k < contentTokens.length; k++) {
            if (contentTokens[k].type === 'text') {
              contentParts.push(contentTokens[k].content);
            } else if (contentTokens[k].type === 'open') {
              contentParts.push(contentTokens[k].char);
            } else if (contentTokens[k].type === 'close') {
              contentParts.push(contentTokens[k].char);
            }
          }

          merged.push({
            type: 'pair',
            open: openChar,
            close: closeChar,
            exampleContent: contentParts.join('')
          });
          i = j;
          continue;
        }
      }

      if (template[i].type === 'text') {
        merged.push({ type: 'text', content: template[i].content });
      }
      i++;
    }

    return { template: merged, error: null };
  }

  /**
   * 将模板渲染为可视化字符串
   */
  function renderTemplateToHTML(template) {
    var html = '';
    for (var i = 0; i < template.length; i++) {
      var item = template[i];
      if (item.type === 'pair') {
        html += '<span class="template-pair">' + escapeHtml(item.open) + '</span>';

        var content = item.exampleContent;
        var varMatch = content.match(/^\{(.+?)\}$/);
        if (varMatch) {
          html += '<span class="template-var" title="变量：' + escapeHtml(varMatch[1]) + '">' + escapeHtml(varMatch[1]) + '</span>';
        } else {
          html += '<span class="template-var" title="示例：' + escapeHtml(content) + '">_</span>';
        }

        html += '<span class="template-pair">' + escapeHtml(item.close) + '</span>';
      } else {
        if (item.content.trim()) {
          html += '<span class="template-text">' + escapeHtml(item.content) + '</span>';
        }
      }
    }
    return html || '<span class="text-muted">（未识别到格式）</span>';
  }

  /**
   * 将模板转为纯文本描述
   */
  function renderTemplateToText(template) {
    var text = '';
    for (var i = 0; i < template.length; i++) {
      var item = template[i];
      if (item.type === 'pair') {
        text += item.open + '_' + item.close;
      } else {
        text += item.content;
      }
    }
    return text;
  }

  /**
   * 从示例文件名拆分为分段
   * 按成对符号自动拆分，符号本身作为固定段，符号之间作为可变段
   */
  function splitExampleToSegments(example) {
    var name = removeExtension(example).trim();
    if (!name) {
      return { segments: [], error: '文件名不能为空' };
    }

    var segments = [];
    var stack = [];
    var currentText = '';
    var i;

    for (i = 0; i < name.length; i++) {
      var ch = name[i];

      if (PAIRS[ch]) {
        // 开符号
        if (currentText) {
          segments.push({ type: 'var', value: currentText });
          currentText = '';
        }
        stack.push({ char: ch, pos: i });
        segments.push({ type: 'fixed', value: ch });
      } else if (CLOSE_TO_OPEN[ch]) {
        // 闭符号
        var last = stack[stack.length - 1];
        if (last && PAIRS[last.char] === ch) {
          stack.pop();
          if (currentText) {
            segments.push({ type: 'var', value: currentText });
            currentText = '';
          }
          segments.push({ type: 'fixed', value: ch });
        } else {
          currentText += ch;
        }
      } else {
        currentText += ch;
      }
    }

    if (currentText) {
      segments.push({ type: 'var', value: currentText });
    }

    if (stack.length > 0) {
      var unclosedChars = stack.map(function (s) { return s.char; });
      return { segments: [], error: '示例中有未闭合的符号：' + unclosedChars.join('、') };
    }

    return { segments: segments, error: null };
  }

  /**
   * 将分段渲染为可视化 HTML
   */
  function renderSegmentsToHTML(segments) {
    var html = '';
    for (var i = 0; i < segments.length; i++) {
      var seg = segments[i];
      if (seg.type === 'fixed') {
        html += '<span class="template-pair">' + escapeHtml(seg.value) + '</span>';
      } else if (seg.type === 'regex') {
        var display = seg.value || '_';
        html += '<span class="template-regex" title="正则：' + escapeHtml(seg.pattern || '') + '">' + escapeHtml(display) + '</span>';
      } else {
        var display = seg.value || '_';
        html += '<span class="template-var">' + escapeHtml(display) + '</span>';
      }
    }
    return html || '<span class="text-muted">（空模板）</span>';
  }

  /**
   * 将分段转为纯文本描述
   */
  function renderSegmentsToText(segments) {
    var text = '';
    for (var i = 0; i < segments.length; i++) {
      var seg = segments[i];
      if (seg.type === 'fixed') {
        text += seg.value;
      } else {
        text += '_';
      }
    }
    return text;
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 暴露到全局
  global.FileNameTemplateParser = {
    extractTemplate: extractTemplate,
    renderTemplateToHTML: renderTemplateToHTML,
    renderTemplateToText: renderTemplateToText,
    splitExampleToSegments: splitExampleToSegments,
    renderSegmentsToHTML: renderSegmentsToHTML,
    renderSegmentsToText: renderSegmentsToText,
    removeExtension: removeExtension,
    PAIRS: PAIRS
  };

})(window);
