const wordList = [
  "able", "acid", "aged", "also", "area", "army", "away", "baby", "back", "ball",
  "band", "bank", "base", "bath", "bear", "beat", "been", "beer", "bell", "belt",
  "best", "bill", "bird", "blow", "blue", "boat", "body", "bomb", "bond", "bone",
  "book", "boom", "born", "boss", "both", "bowl", "bulk", "burn", "bush", "busy",
  "call", "calm", "came", "camp", "card", "care", "case", "cash", "cast", "cell",
  "chat", "chip", "city", "club", "coal", "coat", "code", "cold", "come", "cook",
  "cool", "cope", "copy", "core", "cost", "crew", "crop", "dark", "data", "date",
  "dawn", "dead", "deal", "dean", "dear", "debt", "deep", "deny", "desk", "dial",
  "diet", "disk", "does", "done", "door", "dose", "down", "draw", "drop", "drug",
  "dual", "duck", "duty", "each", "earn", "ease", "east", "easy", "edge", "else",
  "even", "ever", "exit", "face", "fact", "fail", "fair", "fall", "farm", "fast",
  "fate", "fear", "feed", "feel", "feet", "fell", "felt", "file", "fill", "film",
  "find", "fine", "fire", "firm", "fish", "five", "flat", "flow", "food", "foot",
  "ford", "form", "fort", "free", "from", "fuel", "full", "fund", "gain", "game",
  "gate", "gave", "gear", "gene", "gift", "girl", "give", "glad", "goal", "goes",
  "gold", "golf", "gone", "good", "gray", "grew", "grey", "grow", "gulf", "hair",
  "half", "hall", "hand", "hang", "hard", "harm", "hate", "have", "head", "hear",
  "heat", "held", "hell", "help", "here", "hero", "high", "hill", "hire", "hold",
  "hole", "holy", "home", "hope", "host", "hour", "huge", "hung", "hunt", "hurt",
  "idea", "inch", "into", "iron", "item", "jack", "jane", "jean", "john", "join",
  "jump", "jury", "just", "keen", "keep", "kept", "kick", "kill", "kind", "king",
  "knee", "knew", "know", "lack", "lady", "laid", "lake", "land", "lane", "last",
  "late", "lead", "left", "less", "life", "lift", "like", "line", "link", "list",
  "live", "load", "loan", "lock", "logo", "long", "look", "lord", "lose", "loss",
  "lost", "love", "luck", "made", "mail", "main", "make", "male", "many", "mark",
  "mass", "mate", "math", "meal", "mean", "meat", "meet", "menu", "mere", "mild",
  "mile", "milk", "mind", "mine", "miss", "mode", "mood", "moon", "more", "most",
  "move", "much", "must", "name", "navy", "near", "neck", "need", "news", "next",
  "nice", "nick", "nine", "none", "nose", "note", "okay", "once", "only", "open",
  "oral", "over", "pace", "pack", "page", "paid", "pain", "pair", "pale", "park",
  "part", "pass", "past", "path", "peak", "pick", "pink", "pipe", "plan", "play",
  "plot", "plug", "plus", "poll", "pool", "poor", "port", "post", "pull", "pure",
  "push", "race", "rain", "rank", "rare", "rate", "read", "real", "rear", "rely",
  "rent", "rest", "rice", "rich", "ride", "ring", "rise", "risk", "road", "rock",
  "role", "roof", "room", "root", "rose", "rule", "rush", "safe", "said", "sake",
  "sale", "salt", "same", "sand", "save", "seat", "seed", "seek", "seem", "seen",
  "self", "sell", "send", "shop", "shot", "show", "shut", "sick", "side", "sign",
  "site", "size", "skin", "slip", "slow", "snow", "soft", "soil", "sold", "sole",
  "some", "song", "soon", "sort", "soul", "spot", "star", "stay", "step", "stop",
  "such", "suit", "sure", "take", "tale", "talk", "tall", "tank", "tape", "task",
  "team", "tech", "tell", "tend", "term", "test", "text", "than", "that", "them",
  "then", "they", "thin", "this", "thus", "till", "time", "tiny", "told", "tone",
  "took", "tool", "tour", "town", "tree", "trip", "true", "tune", "turn", "type",
  "unit", "upon", "used", "user", "vary", "vast", "very", "vice", "view", "vote",
  "wage", "wait", "wake", "walk", "wall", "want", "ward", "warm", "warn", "wash",
  "wave", "ways", "weak", "wear", "week", "well", "went", "were", "west", "what",
  "when", "whom", "wide", "wife", "wild", "will", "wind", "wine", "wing", "wipe",
  "wire", "wise", "wish", "with", "wolf", "wood", "word", "wore", "work", "yard",
  "yeah", "year", "your", "zero", "zone"
];
let secretWord = "";
let attempts = 0;
let maxAttempts = 8;
let score = 100;

function startGame() {
  secretWord = wordList[Math.floor(Math.random() * wordList.length)];
  attempts = 0;
  score = 100;
  document.getElementById("feedback").innerHTML = "";
  document.getElementById("attemptsLeft").textContent = `Attempts Left: ${maxAttempts}`;
  document.getElementById("scoreDisplay").textContent = `Score: ${score}`;
  document.getElementById("guessInput").value = "";
  document.getElementById("guessInput").disabled = false;
  document.getElementById("replay").style.display = "none";
}

function submitGuess() {
  const input = document.getElementById("guessInput");
  const guess = input.value.toLowerCase().trim();

  if (guess.length !== 4) {
    alert("Please enter a 4-letter word.");
    return;
  }

  const feedbackDiv = document.getElementById("feedback");
  const result = [];
  const usedSecret = [false, false, false, false];

  // First pass: exact matches
  for (let i = 0; i < 4; i++) {
    if (guess[i] === secretWord[i]) {
      result[i] = { letter: guess[i], className: "correct" };
      usedSecret[i] = true;
    } else {
      result[i] = null;
    }
  }

  // Second pass: misplaced letters
  for (let i = 0; i < 4; i++) {
    if (!result[i]) {
      let found = false;
      for (let j = 0; j < 4; j++) {
        if (!usedSecret[j] && guess[i] === secretWord[j]) {
          found = true;
          usedSecret[j] = true;
          break;
        }
      }
      result[i] = found
        ? { letter: guess[i], className: "misplaced" }
        : { letter: guess[i], className: "wrong" };
    }
  }

  // Display feedback
  const row = document.createElement("div");
  result.forEach(({ letter, className }) => {
    const span = document.createElement("span");
    span.textContent = letter.toUpperCase();
    span.className = `letter ${className}`;
    row.appendChild(span);
  });
  feedbackDiv.appendChild(row);

  attempts++;
  score -= 10;

  document.getElementById("attemptsLeft").textContent = `Attempts Left: ${maxAttempts - attempts}`;
  document.getElementById("scoreDisplay").textContent = `Score: ${score}`;

  if (guess === secretWord) {
    feedbackDiv.innerHTML += `<p>🎉 You guessed the word in ${attempts} tries!</p>`;
    endGame();
  } else if (attempts >= maxAttempts) {
    feedbackDiv.innerHTML += `<p>❌ Out of attempts! The word was <strong>${secretWord.toUpperCase()}</strong>.</p>`;
    endGame();
  }

  input.value = "";
}

function endGame() {
  document.getElementById("guessInput").disabled = true;
  document.getElementById("replay").style.display = "inline-block";
}

// Start the game on page load
window.onload = startGame;

window.onload = () => {
  startGame();
  document.getElementById("guessInput").focus();
};


document.getElementById("guessInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    submitGuess();
  }
});
