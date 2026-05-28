const scene = document.getElementById('scene');
const storyBox = document.getElementById('storyBox');
const speakerLabel = document.getElementById('speakerLabel');
const mergedStory = document.getElementById('mergedStory');
const mergedStoryText = document.getElementById('mergedStoryText');
const storyText = document.getElementById('storyText');
const interaction = document.getElementById('interaction');
const input = document.getElementById('feelingInput');
const sendBtn = document.getElementById('sendBtn');
const countEl = document.getElementById('count');
const loveReply = document.getElementById('loveReply');
const greenPlanet = document.getElementById('greenPlanet');
const bluePlanet = document.getElementById('bluePlanet');
const mergedPlanet = document.getElementById('mergedPlanet');
const flash = document.getElementById('flash');
const secretLetter = document.getElementById('secretLetter');
const closeLetter = document.getElementById('closeLetter');
const planetHint = document.getElementById('planetHint');
const connectionLine = document.getElementById('connectionLine');
const wishStars = document.getElementById('wishStars');
const nextArrow = document.getElementById('nextArrow');
const planetStage = document.getElementById('planetStage');
const typeSound = document.getElementById('typeSound');
const startScreen = document.getElementById('startScreen');
const startBtn = document.getElementById('startBtn');
const beforeMusic = document.getElementById('beforeMusic');
const afterMusic = document.getElementById('afterMusic');
const musicVolume = document.getElementById('musicVolume');
let hasStarted = false;
let currentMusic = null;
let targetMusicVolume = musicVolume ? Number(musicVolume.value) : 0.28;

const storyParts = [
  { text: 'Hey...', glow: null, revealSpace: false, pauseAfter: 2100 },
  { text: 'Burada biri mi var?', glow: null, revealSpace: false, pauseAfter: 1400 },
  { text: 'Sen... gerçekten buradasın.', glow: null, revealSpace: false, pauseAfter: 1500 },
  { text: 'Hoş geldin.', glow: null, revealSpace: false, pauseAfter: 1300 },
  { text: 'Uzun zamandır burada sadece boşluğu dinliyordum.', glow: null, revealSpace: false, pauseAfter: 1700 },
  { text: 'Yıldızlar vardı, karanlık vardı, sessizlik vardı...', glow: null, revealSpace: false, pauseAfter: 1800 },
  { text: 'Ama konuşacak kimsem yoktu.', glow: null, revealSpace: false, pauseAfter: 1500 },
  { text: 'Belki de bu yüzden buradasındır, kim bilir?.', glow: null, revealSpace: false, pauseAfter: 1650 },
  { text: 'Çünkü sana bir hikâye anlatmam gerekiyor.', glow: null, revealSpace: false, pauseAfter: 1600 },
  { text: 'Bir zamanlar, ben bile yokken — iki küçük gezegen vardı.', glow: null, revealSpace: true, pauseAfter: 1800 },
  { text: 'Biri yeşildi.', glow: 'green', revealSpace: true, pauseAfter: 1300 },
  { text: 'Zeytin yeşiline çalan, içinde kehribar bir sıcaklık taşıyan bir gezegen.', glow: 'green', revealSpace: true, pauseAfter: 2000 },
  { text: 'Derindi. Meraklıydı. Hep bir şeylerin anlamını arardı.', glow: 'green', revealSpace: true, pauseAfter: 1850 },
  { text: 'Bazen kendi yörüngesinde kaybolur, bazen bütün evreni anlamaya çalışırdı.', glow: 'green', revealSpace: true, pauseAfter: 2100 },
  { text: 'Ama içinde kimseye kolay kolay göstermediği yumuşak bir yer vardı.', glow: 'green', revealSpace: true, pauseAfter: 2000 },
  { text: 'Diğeri maviydi.', glow: 'blue', revealSpace: true, pauseAfter: 1300 },
  { text: 'Çelik mavisiyle gri arasında, sakin ama derin bir parıltısı vardı.', glow: 'blue', revealSpace: true, pauseAfter: 2000 },
  { text: 'Sıcaktı. Anlayışlıydı. Yanında olmak, uzun bir yolculuktan sonra eve dönmek gibi hissetiriyordu.', glow: 'blue', revealSpace: true, pauseAfter: 2300 },
  { text: 'Onun ışığı bağırmazdı; ama yaklaştıkça insanın içini sessizce ısıtırdı.', glow: 'blue', revealSpace: true, pauseAfter: 2200 },
  { text: 'Kendi ekseninde sakince dönerken bile etrafındaki karanlığı daha az korkutucu yapardı.', glow: 'blue', revealSpace: true, pauseAfter: 2300 },
  { text: 'İkisi de aynı galaksideydiler.', glow: 'both', revealSpace: true, pauseAfter: 1450 },
  { text: 'Ama birbirlerinden habersizdiler.', glow: 'both', revealSpace: true, pauseAfter: 1450 },
  { text: 'Aralarında mesafeler, sessizlikler ve söylenmemiş ihtimaller vardı.', glow: 'both', revealSpace: true, pauseAfter: 1950 },
  { text: 'Ben onları bir araya getirmek istiyorum.', glow: 'both', revealSpace: true, pauseAfter: 1700 },
  { text: 'Ama bunu tek başıma başaramam.', glow: null, revealSpace: true, pauseAfter: 1400 },
  { text: 'Çünkü bazı kavuşmalar, ancak bir şeyler söylendiğinde başlar.', glow: 'both', revealSpace: true, pauseAfter: 2100 },
  { text: 'Sana ihtiyacım var.', glow: 'both', revealSpace: true, pauseAfter: 1500 }
];

const replies = [
  'Bunu duydular. Yeşil ışık biraz daha cesaretlendi; mavi ışık da ilk kez ona doğru döndü.',
  'Bu cümle boşlukta kaybolmadı. İkisinin arasına ince, sıcak bir yol çizildi.',
  'Söylediğin her kelime aralarındaki sessizliği biraz daha yumuşatıyor. Artık uzaklık eskisi kadar güçlü değil.',
  'Evren bile nefesini tutmuş gibi. İki ışık birbirini tanımaya başlıyor.',
  'İşte bu. Bazı sözler mesafeyi değil, kaderi değiştirir. Şimdi kavuşmaya hazırlar.'
];

const mergedStoryParts = [
  { text: 'Bir anlığına bütün evren susmuş gibiydi.', pauseAfter: 1900 },
  { text: 'Işık söndüğünde artık iki ayrı gezegen yoktu.', pauseAfter: 2100 },
  { text: 'Sonra karanlığın içinde yeni bir renk nefes aldı.', pauseAfter: 2200 },
  { text: 'Yeşilin merakıyla mavinin huzuru aynı yörüngede birleşmişti.', pauseAfter: 2400 },
  { text: 'Ortaya çıkan renk ne sadece yeşildi, ne sadece maviydi.', pauseAfter: 2100 },
  { text: 'Turkuazdı.', pauseAfter: 2800 },
  { text: 'Sanki iki ayrı kalp, birbirinden hiçbir şey eksiltmeden yeni bir ritim bulmuştu.', pauseAfter: 2600 },
  { text: 'Biri aramayı hiç bırakmamıştı.', pauseAfter: 1900 },
  { text: 'Diğeri ise bulunduğu her yeri eve çevirmeyi biliyordu.', pauseAfter: 2300 },
  { text: 'Ve şimdi aynı ışığın içinde, ikisi de daha tamam görünüyordu.', pauseAfter: 2500 },
  { text: 'O anda anladım...', pauseAfter: 2600 },
  { text: 'Aşk bazen iki insanın birbirine bakması değil, aynı evreni birlikte kurmasıdır.', pauseAfter: 2800 },
  { text: 'Bu yüzden bu yeni gezegen yalnızca bir son değil.', pauseAfter: 2200 },
  { text: 'Onların beraber yazacağı bütün güzel günlerin ilk ışığı.', pauseAfter: 2600 },
  { text: 'Mutlu Yıllar, Ceren. 🎂💫', pauseAfter: 2400 },
  { text: 'İyi ki doğdun. İyi ki ışığını benimle paylaştın; karanlık sandığım yerleri seninle birlikte daha sıcak, daha renkli ve daha yaşanır bir evrene dönüştürdüğün için iyi ki varsın. ✨', pauseAfter: 4200 }
];

let partIndex = 0;
let charIndex = 0;
let messageCount = 0;
const typeSpeed = 72;
let mergedPartIndex = 0;
let mergedCharIndex = 0;
const mergedTypeSpeed = 64;

if (typeSound) {
  typeSound.volume = 0.10;
}

if (beforeMusic) {
  beforeMusic.volume = 0;
}

if (afterMusic) {
  afterMusic.volume = 0;
}

function fadeAudio(audio, targetVolume, duration = 1800, stopWhenSilent = false) {
  if (!audio) return;

  const startVolume = audio.volume;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    audio.volume = startVolume + (targetVolume - startVolume) * progress;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      audio.volume = targetVolume;
      if (stopWhenSilent && targetVolume === 0) {
        audio.pause();
        audio.currentTime = 0;
      }
    }
  }

  requestAnimationFrame(step);
}

function getMusicVolume() {
  return musicVolume ? Number(musicVolume.value) : targetMusicVolume;
}

function updateMusicVolume() {
  targetMusicVolume = getMusicVolume();

  if (currentMusic && !currentMusic.paused) {
    currentMusic.volume = targetMusicVolume;
  }
}

function updateConnectionLine() {
  if (!connectionLine) return;

  connectionLine.classList.remove('bond-1', 'bond-2', 'bond-3', 'bond-4', 'bond-5');

  if (messageCount > 0) {
    connectionLine.classList.add(`bond-${messageCount}`);
  }
}

function createWishStar(text) {
  if (!wishStars) return;

  const star = document.createElement('span');
  star.className = 'wish-star';
  star.textContent = text.length > 34 ? `${text.slice(0, 34)}...` : text;

  const randomX = Math.round((Math.random() - 0.5) * 460);
  const randomY = Math.round(-180 - Math.random() * 240);
  star.style.setProperty('--star-x', `${randomX}px`);
  star.style.setProperty('--star-y', `${randomY}px`);

  wishStars.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 4300);
}

function enableSecretPlanet() {
  mergedPlanet.classList.add('clickable');

  if (planetHint) {
    planetHint.style.display = 'block';
    planetHint.classList.remove('hidden');
  }
}

function openSecretLetter() {
  if (!mergedPlanet.classList.contains('clickable')) return;

  if (planetHint) {
    planetHint.classList.add('hidden');
    planetHint.style.display = 'none';
  }

  if (nextArrow) {
    nextArrow.classList.add('hidden');
    nextArrow.style.display = 'none';
  }

  secretLetter.style.display = 'grid';
  secretLetter.classList.remove('hidden');
}

function closeSecretLetter() {
  secretLetter.classList.add('hidden');
  secretLetter.style.display = 'none';

  if (nextArrow) {
    nextArrow.style.display = 'inline-flex';
    nextArrow.classList.remove('hidden');
  }
}

function goToNextPage() {
  if (nextArrow) {
    nextArrow.disabled = true;
    nextArrow.style.pointerEvents = 'none';
  }

  scene.classList.add('slide-away');

  if (afterMusic) {
    fadeAudio(afterMusic, 0, 1100, true);
  }

  setTimeout(() => {
    window.location.href = 'kedioncesi.html';
  }, 1200);
}

function playAudio(audio) {
  if (!audio) return;

  audio.currentTime = 0;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Browser may still block audio in rare cases.
    });
  }
}

function startExperience() {
  if (hasStarted) return;
  hasStarted = true;

  if (startScreen) {
    startScreen.classList.add('start-hidden');
    setTimeout(() => {
      startScreen.style.display = 'none';
    }, 900);
  }

  if (beforeMusic) {
    currentMusic = beforeMusic;
    targetMusicVolume = getMusicVolume();
    playAudio(beforeMusic);
    fadeAudio(beforeMusic, targetMusicVolume, 2200);
  }

  setTimeout(typePart, 1300);
}

function playTypeSound() {
  if (!typeSound) return;

  typeSound.pause();
  typeSound.currentTime = 0;

  const playPromise = typeSound.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Browser may block sound before the first user interaction.
    });
  }

  setTimeout(() => {
    typeSound.pause();
    typeSound.currentTime = 0;
  }, 180);
}

function revealSpace() {
  scene.classList.remove('intro-dark');
  scene.classList.add('space-revealed');
  storyBox.classList.remove('centered-story');
  storyBox.classList.add('corner-story');
  planetStage.classList.remove('hidden-at-start');
  planetStage.setAttribute('aria-hidden', 'false');
}

function clearGlow() {
  greenPlanet.classList.remove('glow-green');
  bluePlanet.classList.remove('glow-blue');
}

function applyGlow(type) {
  clearGlow();
  if (type === 'green') greenPlanet.classList.add('glow-green');
  if (type === 'blue') bluePlanet.classList.add('glow-blue');
  if (type === 'both') {
    greenPlanet.classList.add('glow-green');
    bluePlanet.classList.add('glow-blue');
  }
}

function typePart() {
  const current = storyParts[partIndex];

  if (current.revealSpace) {
    revealSpace();
  }

  applyGlow(current.glow);

  if (charIndex <= current.text.length) {
    storyText.textContent = current.text.slice(0, charIndex);

    if (charIndex > 0 && charIndex <= current.text.length) {
      playTypeSound();
    }

    charIndex++;
    setTimeout(typePart, typeSpeed);
  } else {
    const pause = current.pauseAfter || 1650;

    setTimeout(() => {
      partIndex++;
      charIndex = 0;
      if (partIndex < storyParts.length) {
        typePart();
      } else {
        clearGlow();
        interaction.classList.remove('hidden');
        interaction.style.display = 'block';
        input.focus();
      }
    }, pause);
  }
}

function movePlanets() {
  const progress = messageCount / 5;
  const greenLeft = 34 + progress * 14;
  const blueLeft = 66 - progress * 14;
  greenPlanet.style.left = `${greenLeft}%`;
  bluePlanet.style.left = `${blueLeft}%`;
  greenPlanet.style.transform = `translate(-50%, -50%) scale(${1 + progress * 0.08})`;
  bluePlanet.style.transform = `translate(-50%, -50%) scale(${1 + progress * 0.08})`;
}

function sendFeeling() {
  const value = input.value.trim();
  if (!value || messageCount >= 5) return;

  messageCount++;
  countEl.textContent = messageCount;
  loveReply.textContent = replies[messageCount - 1];
  createWishStar(value);
  input.value = '';

  greenPlanet.classList.add('glow-green');
  bluePlanet.classList.add('glow-blue');
  movePlanets();
  updateConnectionLine();

  setTimeout(clearGlow, 900);

  if (messageCount === 5) {
    sendBtn.disabled = true;
    input.disabled = true;
    setTimeout(mergePlanets, 1400);
  }
}

function typeMergedStory() {
  const current = mergedStoryParts[mergedPartIndex];

  if (mergedCharIndex <= current.text.length) {
    mergedStoryText.textContent = current.text.slice(0, mergedCharIndex);

    if (mergedCharIndex > 0 && mergedCharIndex <= current.text.length) {
      playTypeSound();
    }

    mergedCharIndex++;
    setTimeout(typeMergedStory, mergedTypeSpeed);
  } else {
    const pause = current.pauseAfter || 1650;

    setTimeout(() => {
      mergedPartIndex++;
      mergedCharIndex = 0;

      if (mergedPartIndex < mergedStoryParts.length) {
        typeMergedStory();
      } else {
        mergedStory.classList.add('hidden');
        mergedStory.style.display = 'none';
        enableSecretPlanet();
      }
    }, pause);
  }
}

function mergePlanets() {
  interaction.classList.add('hidden');
  interaction.style.display = 'none';

  greenPlanet.style.opacity = '0';
  bluePlanet.style.opacity = '0';

  if (beforeMusic) {
    fadeAudio(beforeMusic, 0, 1600, true);
  }

  flash.style.display = 'block';
  flash.classList.remove('hidden');
  flash.classList.remove('boom');
  void flash.offsetWidth;
  flash.classList.add('boom');

  if (connectionLine) {
    connectionLine.classList.remove('bond-1', 'bond-2', 'bond-3', 'bond-4', 'bond-5');
    connectionLine.style.opacity = '0';
  }

  storyBox.classList.add('hidden');
  storyBox.style.display = 'none';

  setTimeout(() => {
    mergedPlanet.style.display = 'block';
    mergedPlanet.classList.remove('hidden');
    mergedPlanet.style.opacity = '1';
    mergedPlanet.style.filter = 'drop-shadow(0 0 52px rgba(80,255,235,.85)) drop-shadow(0 0 120px rgba(80,180,255,.45))';
  }, 900);

  setTimeout(() => {
    if (afterMusic) {
      currentMusic = afterMusic;
      targetMusicVolume = getMusicVolume();
      playAudio(afterMusic);
      fadeAudio(afterMusic, targetMusicVolume, 2600);
    }

    mergedStory.style.display = 'block';
    mergedStory.classList.remove('hidden');
    mergedPartIndex = 0;
    mergedCharIndex = 0;
    mergedStoryText.textContent = '';
    typeMergedStory();
  }, 2400);

  setTimeout(() => {
    flash.classList.add('hidden');
    flash.classList.remove('boom');
    flash.style.display = 'none';
  }, 4300);
}

sendBtn.addEventListener('click', sendFeeling);
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') sendFeeling();
});

window.addEventListener('load', () => {
  scene.classList.add('intro-dark');
  speakerLabel.textContent = '????';
  storyBox.classList.add('centered-story');
  storyBox.classList.remove('corner-story');
  planetStage.classList.add('hidden-at-start');
  planetStage.setAttribute('aria-hidden', 'true');
  mergedStory.classList.add('hidden');
  mergedStory.style.display = 'none';
  if (planetHint) {
    planetHint.classList.add('hidden');
    planetHint.style.display = 'none';
  }
  if (secretLetter) {
    secretLetter.classList.add('hidden');
    secretLetter.style.display = 'none';
  }
  if (connectionLine) {
    connectionLine.classList.remove('bond-1', 'bond-2', 'bond-3', 'bond-4', 'bond-5');
  }
  if (nextArrow) {
    nextArrow.classList.add('hidden');
    nextArrow.style.display = 'none';
  }
});

if (startBtn) {
  startBtn.addEventListener('click', startExperience);
}

if (musicVolume) {
  musicVolume.addEventListener('input', updateMusicVolume);
}

if (mergedPlanet) {
  mergedPlanet.addEventListener('click', openSecretLetter);
}

if (closeLetter) {
  closeLetter.addEventListener('click', closeSecretLetter);
}

if (secretLetter) {
  secretLetter.addEventListener('click', (event) => {
    if (event.target === secretLetter) {
      closeSecretLetter();
    }
  });
}

if (nextArrow) {
  nextArrow.addEventListener('click', goToNextPage);
}
