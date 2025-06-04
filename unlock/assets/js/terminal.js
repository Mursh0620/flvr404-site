const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');
const bgAudio = document.getElementById('bg-audio');

function enableAudio() {
  bgAudio.play().catch(() => {});
  document.removeEventListener('click', enableAudio);
}
document.addEventListener('click', enableAudio);

function appendOutput(text) {
  const line = document.createElement('div');
  line.innerHTML = text;
  terminalOutput.appendChild(line);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function setTheme(name) {
  const root = document.documentElement;
  const getVar = v => getComputedStyle(root).getPropertyValue(v);
  switch (name) {
    case 'glitch':
      root.style.setProperty('--primary-color', getVar('--theme-glitch'));
      break;
    case 'fire':
      root.style.setProperty('--primary-color', getVar('--theme-fire'));
      break;
    default:
      root.style.setProperty('--primary-color', '#00ffcc');
  }
}

function handleCommand(command) {
  switch (command) {
    case 'help':
      appendOutput('Commands:<br>- unlock<br>- lock<br>- xp<br>- theme glitch<br>- theme fire<br>- clear');
      break;
    case 'unlock':
      appendOutput('🔓 Unlocking...');
      break;
    case 'lock':
      appendOutput('🔒 Terminal locked.');
      break;
    case 'xp':
      appendOutput('🧠 XP: 100<br>📶 Level: 2');
      break;
    case 'theme glitch':
      setTheme('glitch');
      appendOutput('Glitch theme activated.');
      break;
    case 'theme fire':
      setTheme('fire');
      appendOutput('Fire theme activated.');
      break;
    case 'clear':
      terminalOutput.innerHTML = '';
      break;
    default:
      appendOutput(`Unknown command: "${command}"`);
  }
}

let debounce = false;
terminalInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !debounce) {
    debounce = true;
    const cmd = terminalInput.value.trim().toLowerCase();
    terminalInput.value = '';
    appendOutput(`> ${cmd}`);
    handleCommand(cmd);
    setTimeout(() => (debounce = false), 200);
  }
});

async function bootSequence() {
  const introScreen = document.getElementById('intro-screen');
  const bootText = document.getElementById('boot-text');
  const lines = [
    '[ FLVR404 SYSTEM INITIATED ]',
    '> Decrypting memory...',
    '> Establishing secure signal...',
    '> Node synchronized.',
    '> Welcome, outsider_404.',
    'Boot sequence complete. Loading terminal...',
    'Welcome to the Terminal Breach.<br>Type <strong>"help"</strong> to view available commands.'
  ];
  for (const line of lines) {
    await new Promise(r => setTimeout(r, 400));
    const div = document.createElement('div');
    div.classList.add('glitch-line');
    bootText.appendChild(div);
    let content = '';
    for (let i = 0; i < line.length; i++) {
      await new Promise(r => setTimeout(r, 20));
      content += line[i];
      div.innerHTML = content;
    }
  }
  await new Promise(r => setTimeout(r, 1000));
  let opacity = 1;
  const fade = () => {
    opacity -= 0.05;
    introScreen.style.opacity = opacity;
    if (opacity <= 0) {
      introScreen.style.display = 'none';
      terminalInput.focus();
      bgAudio.play().catch(() => {});
    } else {
      requestAnimationFrame(fade);
    }
  };
  requestAnimationFrame(fade);
}

window.addEventListener('DOMContentLoaded', bootSequence);
