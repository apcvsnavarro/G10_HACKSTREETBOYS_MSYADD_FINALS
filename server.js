const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

// Sample in-memory storage for requests and chat
let requests = [];
let chatMessages = [];

// API to submit a request
app.post('/api/request', (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description required' });
  }
  const newRequest = { id: requests.length + 1, title, description };
  requests.push(newRequest);
  res.json({ message: 'Request submitted', request: newRequest });
});

// API to get all requests
app.get('/api/request', (req, res) => {
  res.json(requests);
});

// API to send chat message
app.post('/api/chat', (req, res) => {
  const { user, message } = req.body;
  if (!user || !message) {
    return res.status(400).json({ error: 'User and message required' });
  }
  const newMessage = { id: chatMessages.length + 1, user, message };
  chatMessages.push(newMessage);
  res.json({ message: 'Chat message sent', chat: newMessage });
});

// API to get chat messages
app.get('/api/chat', (req, res) => {
  res.json(chatMessages);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
