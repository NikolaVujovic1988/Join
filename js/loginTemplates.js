/**
 * Generates the HTML template for the reset password form
 * @function
 * @returns {string} - The reset password form HTML template
 */
function resetPasswordTemplate() {
    return `
        <div class="signupHeaderContainer">
            <div class="backImgResetContainer">  
                <img onclick="newPassword()" class="backImg pointer" src="../img/arrow-left.png" alt="Back">
            </div> 
            <h1 class="loginH1">Reset your password</h1>
            <span class="underlineForH1"></span>
        </div>
        <div class="loginInputFields">
            <div>
                <span class="subheaderNewPassword">Change your account password</span>
            </div>
            <div class="loginInputField">
                <input class="loginE-Mail" type="password" minlength="8" required id="passwordReset" placeholder="New password">
                <img class="inputImg passwordImg" id="passwordImg" src="../img/pasword.svg" alt="Password" onclick="visibilityPass()">
            </div>
            <div class="loginInputField">
                <input class="loginE-Mail" type="password" minlength="8" required id="passwordResetConfirm" placeholder="Confirm password">
                <img class="inputImg passwordImg" id="passwordImg" src="../img/pasword.svg" alt="Password" onclick="visibilityPass()">
            </div>
        </div>
        <div class="signupFooterBtn">
            <button class="loginBtn pointer" onclick="updatePassword()">Continue</button>
        </div>
        `;
}

/**
 * Returns the HTML template for the login form.
 * @returns {string} The HTML template for the login form.
 */
function loginTemplate() {
  return `
      <div class="cardHeaderContainer">
          <h1 class="loginH1">Log In</h1>
          <span class="underlineForH1"></span>
      </div>
      <div class="loginInputFields">
          <div class="loginInputField">
              <input class="loginE-Mail" type="email" required placeholder="E-mail" id="emailInput">
              <img class="inputImg" src="../img/email.svg" alt="E-Mail">
          </div>
          <div class="loginInputField">
              <input class="loginE-Mail" minlength="8" type="password" required id="passwordInput" placeholder="Password" onkeydown="changePWSymbol()">
              <img class="inputImg passwordImg" id="passwordImg" src="../img/pasword.svg" alt="Password" onclick="visibilityPass()">
          </div>
          <div class="loginFooter">
              <div class="loginFooterLeft">
                  <input class="loginCheckbox margin-left-rifht-5 margin pointer" type="checkbox"> 
                  <p class="rememberMe margin-left-rifht-5 margin">Remember me</p>
              </div>  
              <p class="forgotPass margin-left-rifht-5 margin pointer" onclick="newPassword()">Forgot Password ?</p> 
          </div>
      </div>
      <div class="loginFooterBtns">
          <button id="loginBtn" class="loginBtn pointer" onclick="login()">Login</button>
          <button class="guestBtn pointer" onclick="forwardToMainPage()">Guest Login</button>
      </div>
      `;
}

/**
 * Generates the HTML template for the sign up form
 * @function
 * @returns {string} - The sign up form HTML template
 */
function signUpTemplate() {
  return `
      <form class="signUpForm" onsubmit="register(); return false;">
          <div class="signupHeaderContainer">
              <div class="backImgSignUp">  
                  <img onclick="renderLogin()" class="backImg pointer" src="../img/arrow-left.png" alt="Back">
              </div> 
              <h1 class="loginH1">Sign up</h1>
              <span class="underlineForH1"></span>
          </div>
          <div class="loginInputFields">
              <div class="loginInputField">
                  <input class="loginE-Mail" type="text" required id="signUpName" placeholder="Name">
                  <img class="inputImg" src="../img/human-profile.png" alt="E-Mail">
              </div>
              <div class="loginInputField">
                  <input class="loginE-Mail" type="email" required id="emailSignUp" placeholder="Email">
                  <img class="inputImg" src="../img/email.svg" alt="E-Mail">
              </div>
              <div class="loginInputField">
                  <input class="loginE-Mail" type="password" minlength="8" required id="passwordSignUp" id="passwordInput" placeholder="Password">
                  <img class="inputImg passwordImg" id="passwordImg" src="../img/pasword.svg" alt="Password">
              </div>     
          </div>
          <div class="signupFooterBtn">
              <button id="registerBtn" class="loginBtn pointer">Sign up</button>
          </div>
      </form>
      `;
}

/**
 * Generates the HTML template for the new password form
 * @function
 * @returns {string} - The new password form HTML template
 */
function newPasswordTemplate() {
  return `
      <div class="signupHeaderContainer">
          <div class="backImgContainer">
              <img src="../img/arrow-left.png" onclick="renderLogin()" class="backImg pointer" alt="Back">
          </div> 
          <h1 class="loginH1">Forgot Password</h1>
          <span class="underlineForH1"></span>
      </div>
      <div class="loginInputFields">
          <div>
              <span class="subheaderNewPassword">Don't worry! We will send you an email with the instructions to reset your password.</span>
          </div>
          <div class="loginInputField">
              <input id="resetEmail" class="loginE-Mail" type="email" placeholder="Email" required>
              <img src="../img/email.svg" class="inputImg" alt="E-Mail">
          </div>
      </div>
      <div class="signupFooterBtn">
          <button class="loginBtn pointer" onclick="resetPassword()">Send Email</button>
      </div>
      `;
}