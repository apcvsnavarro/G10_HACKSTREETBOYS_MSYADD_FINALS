function validateLogin() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  if (username === 'user' && password === 'pass') {
    alert('Login successful!');
    return true;
  } else {
    alert('Invalid username or password');
    return false;
  }
}