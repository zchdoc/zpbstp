// 信息按钮模块
// 使用全局函数，不再导入
// import { openModal, closeModal } from './modal.js';

// 创建信息按钮
function createInfoButton(item) {
  const infoBtn = document.createElement('span');
  infoBtn.className = 'info-button';
  infoBtn.innerHTML = 'i';
  infoBtn.title = '查看详细信息';

  // 改为点击事件
  infoBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    openModal(item);
  });

  // 初始状态隐藏，只在父元素悬停时显示
  infoBtn.style.opacity = '0';
  infoBtn.style.visibility = 'hidden';
  infoBtn.style.transition = 'opacity 0.3s, visibility 0.3s';

  return infoBtn;
}

// 改为全局函数
window.createInfoButton = createInfoButton;