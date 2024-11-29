// script.js
const playButton = document.getElementById("play-button");
const slots = [
  document.getElementById("slot1"),
  document.getElementById("slot2"),
  document.getElementById("slot3")
];
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const messagesc = document.getElementById("messagesc");

let score = 0;

// List of slot symbols
const symbols = ["🍒", "🍋", "🍉", "🍇", "⭐", "🍊"];

// Function to spin an individual slot
function spinSlot(slot, delay) {
  return new Promise((resolve) => {
    let count = 0;
    const interval = setInterval(() => {
      slot.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      count++;
      if (count > 10) {
        clearInterval(interval);
        resolve();
      }
    }, delay);
  });
}

// Function to check the result of the spin
function checkResult() {
  const [slot1, slot2, slot3] = slots.map(slot => slot.textContent);
  if (slot1 === slot2 && slot2 === slot3) {
    message.textContent = "🎉 YOU WON! 🎉";
    message.style.color = "lime";
    score += 10; // Increase score on win
  } 
  else if((slot1 === slot2 || slot2 === slot3) || slot1===slot3){
    message.textContent = "Partial match";
    message.style.color = "lime";
    score += 5; 
  }  
  else {
    message.textContent = "TRY AGAIN!";
    message.style.color = "red";
    score = Math.max(0, score - 5); // Decrease score on loss
  }
  // Update score display
  scoreDisplay.textContent = "Score:";
  messagesc.textContent = score;
}

// Event listener for the play button
playButton.addEventListener("click", async () => {
  message.textContent = "Spinning...";
  playButton.disabled = true;

  // Wait for all slots to finish spinning
  await Promise.all([
    spinSlot(slots[0], 100),
    spinSlot(slots[1], 150),
    spinSlot(slots[2], 200),
  ]);

  // Check the result after spinning
  checkResult();

  // Re-enable the play button
  playButton.disabled = false;
});
