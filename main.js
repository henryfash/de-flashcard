// main.js

// Shuffle helper
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

window.addEventListener("DOMContentLoaded", () => {
  if (typeof cards === "undefined" || cards.length === 0) {
    console.error("❌ No cards found. Check that words.js is loaded before main.js");
    return;
  }

  // Load saved selection or default
  let selectedCount = localStorage.getItem("wordCount") || "10";
  document.getElementById("wordCount").value = selectedCount;

  // Shuffle cards
  let shuffledCards = shuffle([...cards]);

  // Apply word limit
  let availableCards = selectedCount === "all"
    ? shuffledCards
    : shuffledCards.slice(0, parseInt(selectedCount));

  if (availableCards.length === 0) {
    console.error("❌ No available cards after applying word limit");
    return;
  }

  let index = 0;
  const flashcard = document.getElementById("flashcard");
  const front = document.getElementById("front");
  const back = document.getElementById("back");

  function showCard(i) {
    const card = availableCards[i];
    if (!card) return;

    // Front = word only
    front.textContent = card.word;

    // Back = structured layout
    back.innerHTML = `
      <div class="top">${card.word} — ${card.translationWord}</div>
      <div class="middle">${card.sentence}</div>
      <div class="bottom">${card.translationSentence}</div>
    `;

    flashcard.classList.remove("flipped");
  }

  // Flip on click
  flashcard.addEventListener("click", () => {
    flashcard.classList.toggle("flipped");
  });

  // Next card
  document.getElementById("next").addEventListener("click", () => {
    index = (index + 1) % availableCards.length;
    showCard(index);
  });

  // Previous card
  document.getElementById("prev").addEventListener("click", () => {
    index = (index - 1 + availableCards.length) % availableCards.length;
    showCard(index);
  });

  // Change number of words
  document.getElementById("wordCount").addEventListener("change", (e) => {
    localStorage.setItem("wordCount", e.target.value);
    window.location.reload();
  });

  // Reset selection
  document.getElementById("reset").addEventListener("click", () => {
    localStorage.removeItem("wordCount");
    window.location.reload();
  });

  // Show first card
  console.log("✅ Loaded", availableCards.length, "cards");
  showCard(index);
});
