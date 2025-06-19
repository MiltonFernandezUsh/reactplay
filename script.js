let currentStimulus = "";
let correctAnswer = "";
let total = 0, correct = 0, errors = 0;
let startTime = 0;
let level = 1;
let timer = 2000;
let currentMode = "futbol";
const bgm = new Audio();

const options = {
  futbol: [
    { stimulus: "⚽️ Pase", answer: "left" },
    { stimulus: "🥅 Tiro", answer: "right" },
    { stimulus: "🏃‍♂️ Amague", answer: "center" }
  ],
  hockey: [
    { stimulus: "🏑 Pase", answer: "left" },
    { stimulus: "🥅 Tiro", answer: "right" },
    { stimulus: "🏃‍♀️ Desmarque", answer: "center" }
  ],
  basquet: [
    { stimulus: "🏀 Triple", answer: "right" },
    { stimulus: "🧍 Pase", answer: "left" },
    { stimulus: "⛹️ Drible", answer: "center" }
  ]
};

document.getElementById("modeSelect").addEventListener("change", e => {
  currentMode = e.target.value;
});

function setLevel(lvl) {
  level = lvl;
  if (level === 1) {
    bgm.src = "easy.mp3";
    timer = 2000;
  } else if (level === 2) {
    bgm.src = "medium.mp3";
    timer = 1500;
  } else {
    bgm.src = "hard.mp3";
    timer = 1000;
  }
  bgm.loop = true;
  bgm.play();
}

function startGame() {
  document.getElementById("feedback").textContent = "";
  total++;
  if (correct >= 5) setLevel(2);
  if (correct >= 10) setLevel(3);
  const subset = options[currentMode];
  const random = subset[Math.floor(Math.random() * subset.length)];
  currentStimulus = random.stimulus;
  correctAnswer = random.answer;
  document.getElementById("stimulus").textContent = currentStimulus;
  startTime = Date.now();

  setTimeout(() => {
    if (Date.now() - startTime >= timer && currentStimulus !== "") {
      document.getElementById("feedback").textContent = "⛔ ¡Tarde!";
      errors++;
      updateStats();
      currentStimulus = "";
    }
  }, timer + 100);
}

function answer(choice) {
  if (currentStimulus === "") return;

  let timeTaken = (Date.now() - startTime) / 1000;
  if (choice === correctAnswer) {
    document.getElementById("feedback").textContent = `✅ Bien (${timeTaken.toFixed(2)}s)`;
    correct++;
  } else {
    document.getElementById("feedback").textContent = `❌ Incorrecto`;
    errors++;
  }
  currentStimulus = "";
  updateStats();
  localStorage.setItem(`score_${currentMode}`, correct);
}

function updateStats() {
  document.getElementById("stats").textContent =
    `✔️ Correctas: ${correct} / ❌ Errores: ${errors} / Total: ${total}`;
}

function share() {
  const text = `Mi puntaje en ReactPlay modo ${currentMode} fue ${correct} aciertos. ¿Te animás?`;
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({ title: 'ReactPlay', text, url });
  } else {
    alert("Copiá y compartí este mensaje:
" + text + " " + url);
  }
}