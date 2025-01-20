// Initialize score and history
let score = 0; // Tracks the player's current session score
let history = JSON.parse(localStorage.getItem("kangoHistory")) || []; // Retrieve history from localStorage or start empty

// Function to navigate between pages
function goToPage(pageNumber) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page, index) => {
    page.classList.toggle("active", index + 1 === pageNumber);
  });
  if (pageNumber === 3) {
    updateHistoryList(); // Update the history list when navigating to the history page
  }
}

// Function to increase score and show floating points
function increaseScore() {
  score += 1;
  document.getElementById("score").textContent = score.toFixed(1); // Update the score on the screen

  // Create floating points effect
  const button = document.querySelector(".gold-button");
  const floatingPoint = document.createElement("div");
  floatingPoint.textContent = "+1"; // Points to show above the button
  floatingPoint.className = "floating-point";

  // Position the floating point near the button
  const rect = button.getBoundingClientRect();
  floatingPoint.style.left = `${rect.left + rect.width / 2}px`;
  floatingPoint.style.top = `${rect.top - 10}px`;
  document.body.appendChild(floatingPoint);

  // Remove the floating point after the animation ends
  floatingPoint.addEventListener("animationend", () => {
    floatingPoint.remove();
  });
}

// Function to save the current session score to history
function saveSession() {
  if (score > 0) {
    history.push({ date: new Date().toLocaleString(), score: score });
    localStorage.setItem("kangoHistory", JSON.stringify(history)); // Save history to localStorage
    score = 0; // Reset the score for the next session
    document.getElementById("score").textContent = score.toFixed(1); // Update the displayed score
  }
}

// Function to update the history list on the history page
function updateHistoryList() {
  const historyList = document.getElementById("history-list");
  historyList.innerHTML = ""; // Clear the list before updating
  history.forEach((session, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Session ${index + 1}: Score - ${session.score} (Date: ${session.date})`;
    historyList.appendChild(listItem);
  });
}

// Function to share the app on different platforms
function shareApp(platform) {
  switch (platform) {
    case "WhatsApp":
      alert("Sharing Kango on WhatsApp...");
      break;
    case "Twitter":
      alert("Sharing Kango on Twitter...");
      break;
    case "Facebook":
      alert("Sharing Kango on Facebook...");
      break;
    default:
      alert("Unknown sharing platform!");
  }
}

// Save the session score when the user closes or refreshes the app
window.addEventListener("beforeunload", saveSession);