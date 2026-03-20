/**
 * JSON 核心功能
 */

import { dom } from './dom.js';
import { state } from './config.js';

/**
 * 深度解析 JSON（处理转义字符）
 */
export function deepFormatJson(obj) {
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
export function formatJson(input, minify = false) {
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
export function sortJsonKeys(obj) {
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

export function updateStats(obj) {
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
