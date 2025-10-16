// Request page logic
const requestForm = document.getElementById('requestForm');
if (requestForm) {
  requestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('titleInput').value.trim();
    const description = document.getElementById('descriptionInput').value.trim();

    if (!title || !description) {
      alert('Please fill in both title and description.');
      return;
    }

    fetch('/api/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    })
      .then(response => response.json())
      .then(data => {
        alert('Request submitted successfully!');
        requestForm.reset();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to submit request.');
      });
  });
}

// Chat page logic
const chatForm = document.querySelector('.chat-form');
const chatInput = document.querySelector('.chat-input');
const chatMessagesContainer = document.querySelector('.chat-messages');

if (chatForm && chatInput && chatMessagesContainer) {
  function addChatBubble(user, message, isUser = false) {
    const bubble = document.createElement('div');
    bubble.classList.add('chat-bubble');
    if (isUser) bubble.classList.add('user');
    bubble.textContent = `${user}: ${message}`;
    chatMessagesContainer.appendChild(bubble);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
  }

  function loadChatMessages() {
    fetch('/api/chat')
      .then(res => res.json())
      .then(messages => {
        chatMessagesContainer.innerHTML = '';
        messages.forEach(msg => addChatBubble(msg.user, msg.message, msg.user === 'You'));
      })
      .catch(console.error);
  }

  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const message = chatInput.value.trim();
    if (!message) return;

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: 'You', message }),
    })
      .then(res => res.json())
      .then(() => {
        addChatBubble('You', message, true);
        chatInput.value = '';
      })
      .catch(console.error);
  });

  // Load existing chat messages on page load
  loadChatMessages();
}
