const counter = document.getElementById("counter");
const counterms = document.getElementById("counterms");
const toggle = document.getElementById("toggle");
const quote = document.getElementById("quote");
const quotes = [
  "Stay focused, stay determined, and believe that every step you take is bringing you closer to your goals.",
  "Focus on your work. If you're distracted by the noise, you'll miss the rhythm of success.",
  "The key to success is to focus on goals, not obstacles.",
  "Stay focused on your goals, your peace, and your happiness. Don't waste time on anything that doesn't contribute to your growth.",
  "In the world of distractions, staying focused is a superpower.",
  "Your future is created by what you do today, not tomorrow. Stay focused.",
  "Distractions are the enemy of greatness. Stay focused on your goals and keep moving forward.",
  "Focus on the step in front of you, not the whole staircase. Progress happens one step at a time.",
  "The successful warrior is the average person with laser-like focus.",
  "Stay focused, go after your dreams, and keep moving toward your goals.",
  "Don't watch the clock; do what it does. Keep going.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "The way to get started is to quit talking and begin doing. - Walt Disney",
  "Do not wait to strike till the iron is hot, but make it hot by striking. - William Butler Yeats",
];

let start = null;
let paused = null;

function renderCounter() {
  if (start == null) {
    counterms.innerHTML = ".000";
    counter.innerHTML = "00:00:00";
    return;
  }

  var t = (paused == null ? Date.now() : paused) - start;
  var h = Math.floor(t / 3600000)
    .toString()
    .padStart(2, "0");
  t %= 3600000;
  var m = Math.floor(t / 60000)
    .toString()
    .padStart(2, "0");
  t %= 60000;
  var s = Math.floor(t / 1000)
    .toString()
    .padStart(2, "0");
  t %= 1000;
  var z = Math.floor(t).toString().padStart(3, "0");

  counterms.innerHTML = `.${z}`;
  counter.innerHTML = `${h}:${m}:${s}`;
}

function updateCounter(timestamp) {
  if (start != null && paused == null) {
    renderCounter();
    window.requestAnimationFrame(updateCounter);
  }
}

function toggleCounter() {
  const now = Date.now();
  if (start != null && paused == null) {
    paused = now;
    toggle.innerHTML = "Start";
    renderCounter();
  } else {
    if (start == null) {
      start = now;
    } else if (paused != null) {
      start += now - paused;
      paused = null;
    }
    toggle.innerHTML = "Stop";
    updateCounter(0);
  }
}

function resetCounter() {
  start = null;
  paused = null;
  toggle.innerHTML = "Start";
  renderCounter();
}

renderCounter();

var index = 0;

function updateQuote() {
  quote.textContent = quotes[index];
  index = (index + 1) % quotes.length;
}

setInterval(updateQuote, 60000);
updateQuote();
