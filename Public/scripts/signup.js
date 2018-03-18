console.log(typeof jQuery);
$(document).ready(function () {

  let token;
  let LoginNowButton = $('#login-button-homescreen');
  let signUpNowButton = $('#sign-up-button-homescreen');
  let verPass = $('#verPassword');
  let passwordLogin = $('#password-login');
  let passwordSignUp = $('#password-sign-up');
  let name = $('#name');
  let usernameLogin = $('#username-login');
  let usernameSignUp = $('#username-sign-up')
  let loginButton = $('#login-button');
  let signUpButton = $('#sign-up-button')

  let errorMessageUsername = $('.username-is-required');
  let errorMessageUsernameLength = $('#username-length');
  let errorMessagePassword = $('.password-is-required');
  let errorMessagePasswordLength = $('#password-length');
  let errorMessageFullName = $('#full-name-required');
  let errorMessageverifyPass = $('#confirm-password-alert');
  let errorMessagePasswordNotMatch = $('#password-not-match');

  function setToken(tok) {
    token = tok;
    // TODO: sækja user og user-profílmynd
  }

  function toggleShowOn(e, onCondition) {
    if (onCondition) {
      e.show();
    } else {
      e.hide();
    }
  }

  function showError(e, errorMessage) {
    if (e.val() === '') {
      errorMessage.show();
    } else {
      errorMessage.hide();
    }
  }

  signUpNowButton.click(function () {
    console.log("signUpNowButton");
    usernameSignUp.val('');
    passwordSignUp.val('');
    name.val('');
    verPass.val('');

    errorMessageUsername.hide();
    errorMessagePassword.hide();
    errorMessageFullName.hide();
    errorMessageverifyPass.hide();
  });

  LoginNowButton.click(function () {
    usernameLogin.val('');
    passwordLogin.val('');

    errorMessageUsername.hide();
    errorMessagePassword.hide();
  });

  loginButton.click(function () {
    if (usernameLogin.val() === '' && passwordLogin.val() === '') {
      errorMessageUsername.show();
      errorMessagePassword.show();
    } else {
      errorMessageUsername.hide();
      errorMessagePassword.hide();
    }

    showError(usernameLogin, errorMessageUsername);
    showError(passwordLogin, errorMessagePassword);

    //username.val('');
    //password.val('');
  });

  signUpButton.click(function () {

    showError(usernameSignUp, errorMessageUsername);
    showError(passwordSignUp, errorMessagePassword);
    showError(name, errorMessageFullName);
    showError(verPass, errorMessageverifyPass);

    // TODO: finna út afhverju errorMessageUsernameLength byrtist ekki
    toggleShowOn(errorMessageUsernameLength, usernameSignUp.val().length > 0 && usernameSignUp.val().length <= 2);
    if (passwordSignUp.val() !== verPass.val()) {
      errorMessagePasswordNotMatch.show();
      if (errorMessageverifyPass.show()) {
        errorMessageverifyPass.hide();
      } else {
        errorMessageverifyPass.show();
      }
    } else {
      errorMessagePasswordNotMatch.hide();
    }

    //toggleShowOn(errorMessagePasswordNotMatch, passwordSignUp.val() !== verPass.val());
    toggleShowOn(errorMessagePasswordLength, passwordSignUp.val().length > 0 && passwordSignUp.val().length <= 5);

    /*username.val('');
    password.val('');
    name.val('');
    verPass.val('');*/

    // username already exists
    // $.get('/users/${username}', null, function (data, status){}, "json")
  });

  function login(callback) {
    $.ajax({
      url : "/login",// your username checker url
      type : "POST",
      data : {
        "username": username.val(),
        "password": password.val(),
      },
      success : function (data) {
        setToken(data.token);
        console.log(token);
        // redirect to homescreen with token in header
      },
      error: function (err) {
        console.log("Error: " + err);
      }
    });
  }

});
