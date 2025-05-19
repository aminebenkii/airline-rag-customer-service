// ==============================
// SESSION MANAGEMENT
// ==============================

const sessionID = crypto.randomUUID();

// ==============================
// EVENT LISTENERS FOR CHAT
// ==============================

sendButton.addEventListener('click', handleSend);
inputField.addEventListener('keydown', (e) => {
  if (e.key === "Enter") handleSend();
});

// ==============================
// CHAT HANDLER
// ==============================

function handleSend() {
  const message = inputField.value.trim();
  if (!message) {
    inputField.classList.add("border-red-400");
    inputField.placeholder = "Please type something...";
    return;
  }

  inputField.classList.remove("border-red-400");
  inputField.placeholder = "Type your message...";
  appendUserMessage(message);
  inputField.value = "";
  toggleInput(false);

  const loadingBubble = createLoadingBubble();
  chatbox.appendChild(loadingBubble);
  scrollToBottom();

  fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionID, query: message })
  })
    .then(res => res.json())
    .then(data => {
      chatbox.removeChild(loadingBubble);
      appendBotMessage(data.answer);
    })
    .catch(() => {
      chatbox.removeChild(loadingBubble);
      appendErrorMessage("⚠️ An error occurred. Please try again later.");
    })
    .finally(() => {
      toggleInput(true);
      scrollToBottom();
    });
}
