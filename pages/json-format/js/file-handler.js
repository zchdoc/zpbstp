/**
 * 文件导入导出
 */

import { dom } from './dom.js';
import { state } from './config.js';
import { hideError, showToast } from './utils.js';

export function initFileHandler() {
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
}
