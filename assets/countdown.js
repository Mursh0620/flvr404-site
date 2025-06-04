function updateCountdown(countdown, targetDate) {
  const now = new Date();
  const diff = targetDate - now;
  const setText = (text) => {
    countdown.textContent = text;
    countdown.innerText = text;
  };
  if (diff <= 0) {
    setText("Drop is Live.");
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    setText(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  }
}

if (typeof module !== 'undefined') {
  module.exports = { updateCountdown };
}
if (typeof window !== 'undefined') {
  window.updateCountdown = updateCountdown;
}
