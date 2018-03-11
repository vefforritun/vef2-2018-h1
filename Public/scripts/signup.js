document.addEventListener("DOMContentLoaded", function () {

  var notAMemberText = document.getElementById('not-a-member');
  var signUpButton = document.getElementById('sign-up-now');
  var verPass = document.getElementById('verPassword');
  var password = document.getElementById('password');
  var name = document.getElementById('name');
  var username = document.getElementById('username');
  var loginButton = document.getElementById('login-button');
  var title = document.getElementById('title')

  document.getElementById('sign-up-now').onclick = function signUpOnClick() {
    title.innerHTML = 'Sign Up';

    if (loginButton.value === 'Login') {
      loginButton.value = 'Sign up';
    } else {
      loginButton.value = 'Login';
    }

    notAMemberText.style.display = 'none';
    signUpButton.style.display = 'none';

    // add inputs for sign-up window
    if (verPass.style.display === 'none') {
      verPass.style.display = 'block';
    } if (name.style.display === 'none') {
      name.style.display = 'block';
    }
    else {
      verPass.style.display = 'none';
      name.style.display = 'none';
    };
  }

  function errorMessages() {
    // ERROR message for username input
    if (username.value === '') {
      alert('Username must be at least 6 characters long');
    }
  }



}, false);
