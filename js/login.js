/**
 * Whether or not the password input field is visible.
 * @type {boolean}
 */
let inputPass = false;

/**
 * The key used to store the current user in localStorage.
 * @type {string}
 */
const CURRENT_USER_KEY = 'currentUser';

/**
 * The current user, obtained from localStorage, or an empty array if no user is found.
 * @type {Array.<Object>}
 */
let currentUser = JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || [];

/**
 * An array containing the current user when they request to change their password.
 * @type {Array.<Object>}
 */
let currentUserForNewPassword = [];


/**
 * Initializes the app by rendering the login form after a 300ms delay.
 * @async
 */
async function init() {
    setTimeout(function() {
        renderLogin()
    }, 300);
}


/**
 * Renders the login form, loading user data beforehand.
 * @async
 */
async function renderLogin() {
    document.title = 'Join | Log in';
    let card = document.getElementById('loginForm');
    card.innerHTML = loginTemplate();
    let header = document.getElementById('loginHeaderRight');
    header.classList.remove("d-none");
    await loadUsers();
}


/**
 * Changes the password input field icon when the user types or clears their password.
 * @async
 */
async function changePWSymbol() {
    let inputField = document.getElementById("passwordInput");
    let symbol = document.getElementById("passwordImg");
    if (inputField.value == "") {
        symbol.src = "../img/pasword.svg";
        symbol.classList.remove("pointer", "opacity");
        inputField.type = "password";
        inputPass = false;
    } else if ((inputField.type = "password")) {
        symbol.src = "../img/privacy.png";
        symbol.classList.add("pointer", "opacity");
        inputPass = true;
    } else {
        symbol.src = "../img/visibility.svg";
        symbol.classList.add("pointer", "opacity");
        inputPass = true;
    }
}


/**
 * Toggles the visibility of the password input field.
 * @async
 */
async function visibilityPass() {
    let password = document.getElementById("passwordInput");
    let passSymbol = document.getElementById("passwordImg");
    if (inputPass === true) {
        if (password.type === "password") {
            password.type = "text";
            passSymbol.src = "../img/visibility.png";
        } else {
            password.type = "password";
            passSymbol.src = "../img/privacy.png";
        }
    }
}


/**
 * Changes the view to the sign up form
 * @function
 */
function signUp() {
    document.title = 'Join | Sign Up';
    let header = document.getElementById('loginHeaderRight');
    header.classList.add("d-none");
    let card = document.getElementById('loginForm');
    card.innerHTML = signUpTemplate();
}


/**
 * Changes the view to the new password form
 * @function
 */
function newPassword() {
    document.title = 'Join | Reset Password';
    let header = document.getElementById('loginHeaderRight');
    header.classList.add("d-none");
    let card = document.getElementById('loginForm');
    card.innerHTML = newPasswordTemplate();
}


/**
 * Changes the view to the reset password form
 * @function
 */
function resetPassword() {
    document.title = 'Join | Reset Password';
    let header = document.getElementById('loginHeaderRight');
    header.classList.add("d-none");
    let card = document.getElementById('loginForm');
    let email = document.getElementById('resetEmail').value;
    let user = users.find(user => user.email === email);

    if (!user) {
        showFailureBanner('User not found!');
        return;
    }

    currentUserForNewPassword.push(user);
    card.innerHTML = resetPasswordTemplate();
}


/**
 * Updates the user's password and saves it to the database
 * @function
 * @async
 */
async function updatePassword() {
    let newPassword = document.getElementById('passwordReset').value;
    let newPasswordConfirmation = document.getElementById('passwordResetConfirm').value;

    if (newPassword !== newPasswordConfirmation) {
        showFailureBanner(`Passwords dont match!<br>Try again`);
    }

    const userIndex = users.findIndex(user => user.email === currentUserForNewPassword[0].email);
    if (userIndex > -1) {
        users[userIndex].password = newPassword;
        await setItem('users', JSON.stringify(users));
        currentUserForNewPassword = [];
        showSuccessBanner('Password resetted');
        renderLogin();
    } 
}


/**
 * Logs the user into the application.
 * @returns {void}
 */
function login() {
    let loginBtn = document.getElementById('loginBtn');
    loginBtn.disabled = true;
    let email = document.getElementById('emailInput').value;
    let password = document.getElementById('passwordInput').value;
    let user = users.find((user) => user.email === email);
    if (!user) {
        showFailureBanner('User not found!');
        loginBtn.disabled = false;
        return;
    }
    if (password !== user.password) {
        showFailureBanner('Invalid password!');
        loginBtn.disabled = false;
        return;
    }
    createCurrentUser(user);
    forwardToMainPage();
}


/**
 * Creates a new user session.
 * @param {Object} user - The user object.
 * @returns {void}
 */
function createCurrentUser(user) {
    currentUser.push(user);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
}


/**
 * Redirects the user to the main page of the application.
 * @returns {void}
 */
function forwardToMainPage() {
    window.location.href = "../mainpage.html";
}


/**
 * Logs the user out of the application.
 * @returns {void}
 */
function logOut() {
    localStorage.removeItem(CURRENT_USER_KEY);
    window.location.href = "../index.html";
}