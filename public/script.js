document.addEventListener('DOMContentLoaded', () => {
 console.log('Javascript is connected');
  const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
event.preventDefault(); //prevent form submittion

const username = document.getElementById('username').value.trim();
const email = document.getElementById('email').value.trim();
const password = document.getElementById('password').value.trim();
const confirmpassword = document.getElementById('confirmpassword').value.trim();

// validation for empty input
if(!username){
  console.log('Please enter your username');
  return;
}

if (!validateEmail(email)) {
  console.log('Please enter a valid email: example@gmail.com')
  return;
}


if(!password) {
  console.log('Please enter password');
  return;
}
if(!confirmpassword) {
  console.log('Please confirm your password');
  return;
}

// submit form if all input are validated
console.log('Form successfully submitted!');
form.submit();
console.log(firstName && lastName && email);   
});
console.log_(`${username} ${email} ${password} ${confirmpassword}`);
function validateEmail(email) {
  const validemail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return validemail.test((email).toLowerCase());
}

})