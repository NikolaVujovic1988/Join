/**
 * gets all information from the server, shows mainpage, loads current date and refreshes the summary
 */
async function initialize() {
    await includeHTML();
    await loadTopics();
    await loadTasks();
    await showContactsFirstLetters();
    loadDate();
    getTaskNumbers();
    showMainpage();
}


/**
 * gets all HTML pages and links them
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


/**
 * changes the site to the mainpage
 */
function showMainpage() {
    changeSite(SUMMARY_ID);
    addBackgroundColorForMainPages('summarySidebar');
}


/**
 * changes the site, shows some effects and resets some variables
 * @param {number} id - ID of the page you want to go to
 */
function changeSite(id) {
    let pageToShow = document.getElementById(id);
    let currentShownPage = document.getElementById(currentPage);
    currentShownPage?.classList.add('d-none');
    pageToShow?.classList.remove('d-none');
    previousPage = currentPage;
    currentPage = id;
    currentAssignedClients = [];
    addTaskSideCreateContact = false;
    updateTasks();
    clearSearchField();
    deleteBackgroundColors();
    getTaskNumbers();
}


/**
 * changes the site to the add new task site and generates the dropdowns
 */
function changeToAddTaskSite(id) {
    changeSite(id);
    showAddTaskSite();
    generateTaskCategories();
    generateContacts();
}


/**
 * shows a popup for the logout
 */
function showLogoutPopup() {
    let popup = document.getElementById('logoutPopup');
    if (popup?.classList.contains('d-none')) {
        popup?.classList.remove('d-none');
        if (mediaQuery.matches) {
            let newContactBtn = document.getElementById('createContactBtn');
            newContactBtn?.classList.add('d-none');
        }
    } else {
        closeLogoutPopup();
    }
}


/**
 * closes the logout popup
 */
function closeLogoutPopup() {
    let popup = document.getElementById('logoutPopup');
    popup?.classList.add('d-none');
    if (mediaQuery.matches && !onContactCard) {
        let newContactBtn = document.getElementById('createContactBtn');
        newContactBtn?.classList.remove('d-none');
    }
}


/**
 * prevents a element in the background not to trigger 
 */
function stopPropagation(event) {
    event.stopPropagation();
}


/**
 * adds background to sidebar element you go to (only for the sites you cant go back)
 */
function addBackgroundColorForMainPages(id) {
    document.getElementById(`${id}`)?.classList.add('backgroundSidebar');
    previousBackground = id;
}


/**
 * adds background to sidebar element you go to (for the sites you can go back)
 */
function addBackgroundColorForSpecialPages(id) {
    document.getElementById(`${id}`)?.classList.add('backgroundSidebar');
}


/**
 * searches for all elements with class .bgdHover then remove the background from each one of this classes
 */
function deleteBackgroundColors() {
    const background = document.querySelectorAll('.bgdHover');
    for (let i = 0; i < background.length; i++) {
        background[i]?.classList.remove('backgroundSidebar');
    }
}


/**
 * creates a random color and pushes it to a variable
 */
function createRandomColor() {
    currentPickedColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    randomContactColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
}


/**
 * shows the current date
 */
function showCurrentDate(id) {
    document.getElementById(id).value = new Date().toLocaleDateString('en-GB');
}


/**
 * sets the focus on the clicked input field
 */
function getFocusOnInputField(id) {
    let input = document.getElementById(`${id}`);
    input.focus();
    input.select();
}


/**
 * resets variables 
 */
function clearVariables() {
    currentCat = '';
    currentPrio = '';
    currentAssignedClients = [];
    currentSubtasks = [];
    fieldsFilledCorrectly = false;
}


/**
 * clears the search field
 */
function clearSearchField() {
    document.getElementById('searchTasks').value = '';
}


/**
 * Fetches the DOM element by its ID.
 * @param {string} id - ID of the DOM element.
 * @returns {HTMLElement|null} - Returns the DOM element or null if not found.
 */
function getElem(id) {
    return document.getElementById(id);
}


/**
 * Toggles classes for a DOM element.
 * @param {HTMLElement} elem - The target DOM element.
 * @param {string[]} addClasses - Array of classes to add.
 * @param {string[]} removeClasses - Array of classes to remove.
 */
function toggleClasses(elem, addClasses, removeClasses) {
    if (!elem) return;
    addClasses.forEach(cls => elem.classList.add(cls));
    removeClasses.forEach(cls => elem.classList.remove(cls));
}

/**
 * Updates the innerHTML content of a DOM element.
 * @param {HTMLElement} elem - The target DOM element.
 * @param {string} content - Content to set as innerHTML.
 */
function updateContent(elem, content) {
    if (elem) elem.innerHTML = content;
}

/**
 * Fades in a popup window and inserts the provided content.
 * @param {string} template - Content to be displayed in the popup.
 */
function fadeInPopupWindow(template) {
    let popupWindow = getElem('popupWindow');
    toggleClasses(popupWindow, ['dark'], ['d-none', 'light']);
    updateContent(popupWindow, template);
}

/**
 * Slides in the content into a popup window.
 * @param {string} template - Content to be displayed in the popup.
 * @param {string} id - ID of the element where content should slide in.
 */
function slideInContent(template, id) {
    fadeInPopupWindow(template);
    toggleClasses(getElem(id), ['move-in'], ['move-out']);
}

/**
 * Closes the popup window. Uses different methods based on the current popup style.
 */
function closePopupWindow() {
    let popupWindow = getElem('popupWindow');
    if (currentPopupStyle == 'fade') {
        toggleClasses(popupWindow, ['light'], ['dark']);
        setTimeout(() => deleteContent(popupWindow), 325);
    } else {
        slideOutContent();
        inAddTaskPopup = false;
        if (taskSavedInCache) {
            setTimeout(showAddTaskWindow, 350);
            setTimeout(loadTaskCache, 350);
        }
    }
    currentAssignment = 'toDo';
}

/**
 * Slides out the content from a popup window.
 */
function slideOutContent() {
    let popupWindow = getElem('popupWindow');
    toggleClasses(popupWindow, ['light'], ['dark']);
    toggleClasses(getElem(popupContentID), ['move-out'], ['move-in']);
    setTimeout(() => deleteContent(popupWindow), 325);
}

/**
 * Removes the dark background class from a popup window.
 * @param {HTMLElement} popupWindow - Target popup window element.
 */
function deleteDarkBackground(popupWindow) {
    toggleClasses(popupWindow, ['d-none'], []);
}

/**
 * Clears the content of a popup window and removes the dark background.
 * @param {HTMLElement} popupWindow - Target popup window element.
 */
function deleteContent(popupWindow) {
    updateContent(popupWindow, '');
    deleteDarkBackground(popupWindow);
}

/**
 * Shows a banner with the specified text and transitions.
 * @param {string} bannerId - ID of the banner element.
 * @param {string} text - Message to be displayed in the banner.
 * @param {string[]} inClasses - Array of classes to apply initially.
 * @param {string[]} outClasses - Array of classes to apply after a timeout.
 * @param {number} duration - Duration in milliseconds before switching classes.
 */
function showBanner(bannerId, text, inClasses, outClasses, duration) {
    let banner = getElem(bannerId);
    updateContent(banner, text);
    toggleClasses(banner, inClasses, outClasses);
    setTimeout(() => toggleClasses(banner, outClasses, inClasses), duration);
    setTimeout(() => toggleClasses(banner, ['d-none'], []), duration + 500);
}

/**
 * Displays a success banner with a message.
 * @param {string} text - Message to be displayed in the banner.
 */
function showSuccessBanner(text) {
    showBanner('successBanner', text, ['move-up'], ['move-down', 'd-none'], 1500);
}


/**
 * Displays a failure banner with a message.
 * @param {string} text - Message to be displayed in the banner.
 */
function showFailureBanner(text) {
    showBanner('failureBanner', text, ['dark-banner'], ['light-banner', 'd-none'], 2000);
}