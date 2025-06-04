const countdown = document.getElementById('countdown');
const targetDate = new Date('2025-06-01T00:00:00+07:00');

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) {
    countdown.innerText = 'Drop is Live.';
  } else {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdown.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

function startGlitchAudio() {
  const audio = document.getElementById('glitchAudio');
  if (audio && audio.paused) {
    audio.play().catch(e => console.log('Autoplay blocked:', e));
  }
}

window.addEventListener('click', startGlitchAudio, { once: true });

function accessDrop() {
  if (new Date() >= targetDate) {
    window.location.href = '/unlock/';
  } else {
    alert('Too early. This drop is encrypted.');
  }
}
