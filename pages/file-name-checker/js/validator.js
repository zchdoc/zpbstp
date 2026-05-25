/**
 * validator.js
 * 文件名校验器：校验文件名是否符合提取的模板格式
 */

(function (global) {
  'use strict';

  /**
   * 去除文件扩展名
   */
  function removeExtension(filename) {
    var lastDot = filename.lastIndexOf('.');
    return lastDot > 0 ? filename.slice(0, lastDot) : filename;
  }

  /**
   * 查找匹配的闭符号（支持嵌套）
   */
  function findMatchingClose(str, openIdx, openChar, closeChar) {
    var depth = 1;
    for (var i = openIdx + 1; i < str.length; i++) {
      if (str[i] === openChar) depth++;
      else if (str[i] === closeChar) {
        depth--;
        if (depth === 0) return i;
      }
    }
    return -1;
  }

  /**
   * 从指定位置尝试匹配模板
   */
  function tryMatchFrom(str, start, pairs) {
    var pos = start;
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i];
      var openIdx = str.indexOf(pair.open, pos);
      if (openIdx === -1) return { success: false };

      var closeIdx = findMatchingClose(str, openIdx, pair.open, pair.close);
      if (closeIdx === -1) return { success: false };

      var content = str.slice(openIdx + 1, closeIdx);
      if (!content.trim()) return { success: false };

      pos = closeIdx + 1;
    }
    return { success: true };
  }

  /**
   * 校验文件名是否符合模板
   * @param {string} filename - 文件名（含扩展名）
   * @param {Array} template - 模板
   * @returns {object} {valid: boolean, reason: string}
   */
  function validateFilename(filename, template) {
    var name = removeExtension(filename);
    var pairs = [];
    for (var i = 0; i < template.length; i++) {
      if (template[i].type === 'pair') {
        pairs.push(template[i]);
      }
    }

    if (pairs.length === 0) {
      return { valid: false, reason: '模板未包含任何成对符号，无法校验' };
    }

    // 尝试从每个位置开始匹配
    for (var start = 0; start < name.length; start++) {
      var result = tryMatchFrom(name, start, pairs);
      if (result.success) {
        return { valid: true, reason: '' };
      }
    }

    // 匹配失败，返回具体原因
    return diagnoseFailure(name, pairs);
  }

  /**
   * 诊断匹配失败的具体原因
   */
  function diagnoseFailure(str, pairs) {
    // 1. 检查是否缺少某些符号
    var openCounts = {};
    var closeCounts = {};
    for (var i = 0; i < pairs.length; i++) {
      var p = pairs[i];
      openCounts[p.open] = (openCounts[p.open] || 0) + 1;
      closeCounts[p.close] = (closeCounts[p.close] || 0) + 1;
    }

    for (var openChar in openCounts) {
      if (openCounts.hasOwnProperty(openChar)) {
        var countInStr = 0;
        for (var j = 0; j < str.length; j++) {
          if (str[j] === openChar) countInStr++;
        }
        if (countInStr < openCounts[openChar]) {
          return { valid: false, reason: '缺少「' + openChar + '」' };
        }
      }
    }

    for (var closeChar in closeCounts) {
      if (closeCounts.hasOwnProperty(closeChar)) {
        var countInStr2 = 0;
        for (var k = 0; k < str.length; k++) {
          if (str[k] === closeChar) countInStr2++;
        }
        if (countInStr2 < closeCounts[closeChar]) {
          return { valid: false, reason: '缺少「' + closeChar + '」' };
        }
      }
    }

    // 2. 检查是否有某对符号内容为空
    for (var m = 0; m < pairs.length; m++) {
      var pair2 = pairs[m];
      var pos = 0;
      while (true) {
        var openIdx2 = str.indexOf(pair2.open, pos);
        if (openIdx2 === -1) break;
        var closeIdx2 = findMatchingClose(str, openIdx2, pair2.open, pair2.close);
        if (closeIdx2 !== -1) {
          var content2 = str.slice(openIdx2 + 1, closeIdx2);
          if (!content2.trim()) {
            return { valid: false, reason: '「' + pair2.open + '」与「' + pair2.close + '」之间不能为空' };
          }
          pos = closeIdx2 + 1;
        } else {
          break;
        }
      }
    }

    // 3. 符号顺序问题
    return { valid: false, reason: '符号顺序或结构不符合模板格式' };
  }

  /**
   * 转义正则特殊字符
   */
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * 使用分段模板校验文件名
   * 依次匹配每个段：固定段按顺序查找，可变段内容可用正则约束
   * 返回结果包含 matches 数组，用于展示每段实际匹配内容
   */
  function validateWithSegments(filename, segments) {
    var name = removeExtension(filename);

    if (segments.length === 0) {
      return { valid: true, reason: '', matches: [] };
    }

    var pos = 0;
    var matches = [];

    for (var i = 0; i < segments.length; i++) {
      var seg = segments[i];

      if (seg.type === 'fixed') {
        if (!seg.value) {
          matches.push({ index: i, type: 'fixed', value: '', matched: '', start: pos, end: pos });
          continue;
        }
        var idx = name.indexOf(seg.value, pos);
        if (idx === -1) {
          return {
            valid: false,
            reason: '缺少固定内容「' + seg.value + '」',
            matches: matches,
            failedAt: i
          };
        }
        matches.push({ index: i, type: 'fixed', value: seg.value, matched: seg.value, start: idx, end: idx + seg.value.length });
        pos = idx + seg.value.length;
      } else {
        // 可变段 / 正则段：找到下一个有值的固定段
        var nextFixedValue = '';
        var nextFixedIndex = -1;
        for (var j = i + 1; j < segments.length; j++) {
          if (segments[j].type === 'fixed' && segments[j].value) {
            nextFixedValue = segments[j].value;
            nextFixedIndex = j;
            break;
          }
        }

        var endPos;
        if (nextFixedValue) {
          var nextIdx = name.indexOf(nextFixedValue, pos);
          if (nextIdx === -1) {
            return {
              valid: false,
              reason: '缺少固定内容「' + nextFixedValue + '」',
              matches: matches,
              failedAt: nextFixedIndex
            };
          }
          endPos = nextIdx;
        } else {
          endPos = name.length;
        }

        var content = name.slice(pos, endPos);

        // 正则段：验证内容是否符合正则规则
        if (seg.type === 'regex' && seg.pattern) {
          try {
            var re = new RegExp('^(?:' + seg.pattern + ')$');
            if (!re.test(content)) {
              return {
                valid: false,
                reason: '第' + (i + 1) + '部分「' + content + '」不符合正则 /' + seg.pattern + '/',
                matches: matches,
                failedAt: i
              };
            }
          } catch (e) {
            return {
              valid: false,
              reason: '第' + (i + 1) + '部分正则语法错误: ' + e.message,
              matches: matches,
              failedAt: i
            };
          }
        }

        matches.push({
          index: i,
          type: seg.type || 'var',
          value: seg.value || '',
          matched: content,
          start: pos,
          end: endPos,
          pattern: seg.pattern || null
        });
        pos = endPos;
      }
    }

    return { valid: true, reason: '', matches: matches };
  }

  /**
   * 检查文件扩展名是否在允许列表中
   */
  function checkExtension(filename, allowedExts) {
    var ext = '';
    var lastDot = filename.lastIndexOf('.');
    if (lastDot > 0 && lastDot < filename.length - 1) {
      ext = filename.slice(lastDot + 1).toLowerCase();
    }
    return allowedExts.indexOf(ext) !== -1;
  }

  // 暴露到全局
  global.FileNameValidator = {
    validateFilename: validateFilename,
    validateWithSegments: validateWithSegments,
    checkExtension: checkExtension,
    removeExtension: removeExtension
  };

})(window);
