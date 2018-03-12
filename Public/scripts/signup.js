document.addEventListener("DOMContentLoaded", function () {

  var notAMemberText = document.getElementById('not-a-member');
  var signUpNowButton = document.getElementById('sign-up-now');
  var verPass = document.getElementById('verPassword');
  var password = document.getElementById('password');
  var name = document.getElementById('name');
  var username = document.getElementById('username');
  var loginButton = document.getElementById('login-button');
  var signUpButton = document.getElementById('sign-up-button')
  var title = document.getElementById('title');

  var errorMessageUsername = document.getElementById('username-is-required');
  var errorMessageUsernameLength = document.getElementById('username-length');
  var errorMessagePassword = document.getElementById('password-is-required');
  var errorMessageFullName = document.getElementById('full-name-required');
  var errorMessageverifyPass = document.getElementById('confirm-password-alert');
  var errorMessagePasswordNotMatch = document.getElementById('password-not-match');

  signUpNowButton.onclick = function signUpOnClick() {
    title.innerHTML = 'Sign Up';
    errorMessageUsername.style.display = 'none';
    errorMessagePassword.style.display = 'none';

    signUpButton.style.display = 'block'
    notAMemberText.style.display = 'none';
    signUpNowButton.style.display = 'none';
    loginButton.style.display = 'none';

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

  loginButton.onclick = function errorMessagesLogin() {
    // ERROR message for username input
    console.log(username.value);
    if (username.value === '' && password.value === '') {
      errorMessageUsername.style.display = 'block';
      errorMessagePassword.style.display = '°2  °eblock';
    } else {
      errorMessageUsername.style.display = 'none';
      errorMessagePassword.style.display = 'none';
    }

    if (username.value === '') {
      errorMessageUsername.style.display = 'block';
    } else {
      errorMessageUsername.style.display = 'none';
    }

    if (password.value === '') {
      errorMessagePassword.style.display = 'block';
    } else {
      errorMessagePassword.style.display = 'none';
    }
  }

  signUpButton.onclick = function errorMessagesSignup() {

    if (username.value === '') {
      errorMessageUsername.style.display = 'block';
    } else {
      errorMessageUsername.style.display = 'none';
    }

    if (username.value.length <= 2) {
      errorMessageUsernameLength.style.display = 'block';
    } else {
      errorMessageUsernameLength.style.display = 'none';
    }

    if (password.value === '') {
      errorMessagePassword.style.display = 'block';
    } else {
      errorMessagePassword.style.display = 'none';
    }

    if (name.value === '') {
      errorMessageFullName.style.display = 'block';
    } else {
      errorMessageFullName.style.display = 'none';
    }

    if (verPass.value === '') {
      errorMessageverifyPass.style.display = 'block';
    } else {
      errorMessageverifyPass.style.display = 'none';
    }

    if (password.value !== verPass.value) {
      errorMessagePasswordNotMatch.style.display = 'block';
    } else {
      errorMessagePasswordNotMatch.style.display = 'none';
    }



    // username already exists
    // $.get('/users/${username}', null, function (data, status){}, "json")
  }

}, false);
