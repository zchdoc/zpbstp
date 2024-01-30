/**
 * 一键粘贴
 * range + selection
 * 1.创建一个 range
 * 2.把内容放入 range
 * 3.把 range 放入 selection
 * 注意：参数 attr 不能是自定义属性
 * 注意：对于 user-select: none 的元素无效
 * 注意：当 id 为 false 且 attr 不会空，会直接复制 attr 的内容
 * @param id
 * @param attr
 */
function copy(id, attr) {
  let target;
  if (attr) {
    target = document.createElement('div');
    target.id = 'tempTarget';
    target.style.opacity = '0';
    if (id) {
      let curNode = document.querySelector('#' + id);
      target.innerText = curNode[attr];
    }
    else {
      target.innerText = attr;
    }
    document.body.appendChild(target);
    // remove temp target
    // target.parentElement.removeChild(target);
  }
  else {
    target = document.querySelector('#' + id);
  }
  try {
    let range = document.createRange();
    range.selectNode(target);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    console.log('复制成功');
    return 1;
  }
  catch (e) {
    console.log('复制失败');
    return 0;
  }
}
