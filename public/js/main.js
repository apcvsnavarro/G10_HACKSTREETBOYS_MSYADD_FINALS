console.log("main.js is loaded and running");

// ----- Request Page Logic -----
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