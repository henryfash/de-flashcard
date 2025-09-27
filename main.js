let currentIndex = 0;
let availableCards = [...cards]; // comes from words.js
const flashcard = document.getElementById("flashcard");
const front = document.getElementById("front");
const back = document.getElementById("back");

function showCard(i) {
  const card = availableCards[i];
  if (!card) return;

  front.textContent = card.word;

  back.innerHTML = `
    <div class="top">${card.word} — ${card.translationWord}</div>
    <div class="middle">${card.sentence}</div>
    <div class="bottom">${card.translationSentence}</div>
  `;

  flashcard.classList.remove("flipped");
}

function nextCard() {
  if (currentIndex < availableCards.length - 1) {
    currentIndex++;
    showCard(currentIndex);
  }
}

function prevCard() {
  if (currentIndex > 0) {
    currentIndex--;
    showCard(currentIndex);
  }
}

function resetCards() {
  const wordCount = document.getElementById("wordCount").value;
  if (wordCount === "all") {
    availableCards = [...cards];
  } else {
    availableCards = cards.slice(0, parseInt(wordCount));
  }
  currentIndex = 0;
  showCard(currentIndex);
}

// Event listeners
flashcard.addEventListener("click", () => {
  flashcard.classList.toggle("flipped");
});
document.getElementById("nextBtn").addEventListener("click", nextCard);
document.getElementById("prevBtn").addEventListener("click", prevCard);
document.getElementById("resetBtn").addEventListener("click", resetCards);
document.getElementById("wordCount").addEventListener("change", resetCards);

// Swipe support for mobile
let startX = 0;
flashcard.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

flashcard.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    nextCard();
  } else if (endX - startX > 50) {
    prevCard();
  } else {
    flashcard.classList.toggle("flipped");
  }
});

// Initialize
resetCards();
