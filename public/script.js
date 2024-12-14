
document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const confirmPassword = document.getElementById('confirmpassword').value.trim();
  
    if (password !== confirmPassword) {
      console.log('Passwords do not match!');
      return;
    }
  
    const userData = { username, email, password, confirmpassword:confirmPassword };
  
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert('Sign-up successful! Redirecting to login page...');
        window.location.href = '/login.html';
      } else {
        alert(result.message || 'Sign-up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });