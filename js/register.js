/**
 * Loads users from the storage.
 * @async
 * @function
 * @returns {Promise<void>} Resolves when users are loaded or an error is logged.
 */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem('users'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}

/**
 * Registers a new user, checks if a user with the same email exists before registration.
 * @async
 * @function
 * @returns {Promise<void>} Resolves when the user is registered, an error message is shown, or the form is reset.
 */
async function register() {
  let registerBtn = document.getElementById('registerBtn');
  registerBtn.disabled = true;

  let name = document.getElementById('signUpName').value;
  let email = document.getElementById('emailSignUp').value;
  let password = document.getElementById('passwordSignUp').value;

  let userExists = users.some((user) => user.email === email);
  if (userExists) {
    alert('User with this email already exists');
    registerBtn.disabled = false;
    return;
  } else {
    users.push({
      name: name,
      email: email,
      password: password,
    })
  };

  await setItem('users', JSON.stringify(users));
  showSuccessBanner('New user created');
  renderLogin();
}

/**
 * Deletes a user from the storage by email.
 * @async
 * @function
 * @param {string} email - The email of the user to be deleted.
 * @returns {Promise<void>} Resolves when the user is deleted, not found, or an error is logged.
 */
async function deleteUser(email) {
  try {
    let users = JSON.parse(await getItem('users'));
    let index = users.findIndex(user => user.email === email);

    if (index !== -1) {
      users.splice(index, 1);
      await setItem('users', JSON.stringify(users));
      console.log(`User with email ${email} has been deleted.`);
    } else {
      console.log(`User with email ${email} not found.`);
    }
  } catch (e) {
    console.error('Deleting error:', e);
  }
}