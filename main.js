// main.js

let currentIndex = 0;
let availableCards = [];
const flashcard = document.getElementById("flashcard");
const front = document.getElementById("front");
const back = document.getElementById("back");
const wordCountSelect = document.getElementById("wordCount");
const resetBtn = document.getElementById("resetBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const flipBtn = document.getElementById("flipBtn");
const progressEl = document.getElementById("progress");

// Shuffle helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function updateProgress() {
  progressEl.textContent = `${currentIndex + 1} / ${availableCards.length}`;
}

function showCard(i) {
  const card = availableCards[i];
  if (!card) return;

  front.textContent = card.word;
  back.innerHTML = `
    <div class="top">${card.translationWord}</div>
    <div class="middle">${card.sentence}</div>
    <div class="bottom">${card.translationSentence}</div>
  `;

  flashcard.classList.remove("flipped");
  updateProgress();
}

function resetCards() {
  const wordCount = wordCountSelect.value;
  let shuffledCards = shuffle([...cards]);
  availableCards = wordCount === "all" ? shuffledCards : shuffledCards.slice(0, parseInt(wordCount));
  currentIndex = 0;
  showCard(currentIndex);
}

function nextCard() {
  currentIndex = (currentIndex + 1) % availableCards.length;
  showCard(currentIndex);
}

function prevCard() {
  currentIndex = (currentIndex - 1 + availableCards.length) % availableCards.length;
  showCard(currentIndex);
}

// --- Event Listeners ---

// Flip card on click/tap (card itself)
flashcard.addEventListener("click", () => {
  flashcard.classList.toggle("flipped");
});

// Flip with button
flipBtn.addEventListener("click", () => {
  flashcard.classList.toggle("flipped");
});

// Navigation
nextBtn.addEventListener("click", nextCard);
prevBtn.addEventListener("click", prevCard);
resetBtn.addEventListener("click", resetCards);
wordCountSelect.addEventListener("change", resetCards);

// Swipe navigation (mobile)
let startX = 0;
flashcard.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

flashcard.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  let deltaX = endX - startX;

  if (Math.abs(deltaX) > 50) {
    if (deltaX < 0) {
      nextCard();
    } else {
      prevCard();
    }
  } else {
    // Small tap also flips (works same as click)
    flashcard.classList.toggle("flipped");
  }
});

// --- Initialize ---
resetCards();
