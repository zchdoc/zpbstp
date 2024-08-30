function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  document.getElementById('time-display').textContent = `${hours}:${minutes}:${seconds}`;
}

function startClock() {
  updateTime();
  setInterval(updateTime, 1000);
}

document.addEventListener('DOMContentLoaded', startClock);