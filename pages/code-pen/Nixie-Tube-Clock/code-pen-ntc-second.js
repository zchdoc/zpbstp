function updateTimeAndDate() {
  const now = new Date();

  // 获取当前小时、分钟、秒，并确保都是两位数
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');

  // 格式化时间字符串为 24 小时制，并添加秒
  let timeStr = hours + minutes + seconds;

  // 处理日期
  let month = (now.getMonth() + 1).toString().padStart(2, '0');
  let day = now.getDate().toString().padStart(2, '0');
  const year = now.getFullYear().toString().slice(-2);

  // 如果月份或日期以 0 开头，则用空格替换
  if (month.startsWith('0')) {
    month = ' ' + month.slice(1);
  }
  if (day.startsWith('0')) {
    day = ' ' + day.slice(1);
  }

  // 合并时间和日期为最终显示的字符串，格式：HHMMSS MMDDYY
  const displayStr = timeStr + month + day + year;

  // 将字符串中的字符依次插入到对应的 HTML 元素中
  for (let i = 0; i < 12; i++) {
    document.getElementById('char' + i + '1').textContent = displayStr[i];
    document.getElementById('char' + i + '2').textContent = displayStr[i];
  }
}

// 立即更新一次
updateTimeAndDate();

// 每秒调用一次 updateTimeAndDate 函数
setInterval(updateTimeAndDate, 1000);
