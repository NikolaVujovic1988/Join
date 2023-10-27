// /**
//  * fades in a popup with dark background, inserts the content
//  * @param {*template} - content to show
//  */
// function fadeInPopupWindow(template) {
//     let popupWindow = document.getElementById('popupWindow');
//     popupWindow?.classList.remove('d-none');
//     popupWindow?.classList.remove('light');
//     popupWindow?.classList.add('dark');
//     popupWindow.innerHTML = template;
// }


// /**
//  * slides in content into a popup window
//  * @param {template} template - content to show
//  * @param {string} id - ID of the element to slide in the content
//  */
// function slideInContent(template, id) {
//     fadeInPopupWindow(template);
//     let content = document.getElementById(`${id}`);
//     content?.classList.remove('move-out');
//     content?.classList.add('move-in');
// }

// /**
//  * if the popup is a fading one it closes it by fading out, otherwise by sliding out
//  */
// function closePopupWindow() {
//     if (currentPopupStyle == 'fade') {
//         let popupWindow = document.getElementById('popupWindow');
//         popupWindow?.classList.add('light');
//         popupWindow?.classList.remove('dark');
//         popupWindow.innerHTML = '';
//         setTimeout(deleteDarkBackground, 325, popupWindow);
//     } else {
//         slideOutContent();
//         inAddTaskPopup = false;
//         if (taskSavedInCache) {
//             setTimeout(showAddTaskWindow, 350);
//             setTimeout(loadTaskCache, 350);
//         }
//     }
//     currentAssignment = 'toDo';
// }


// /**
//  * slides out the content from the popup window
//  */
// function slideOutContent() {
//     let popupWindow = document.getElementById('popupWindow');
//     popupWindow?.classList.add('light');
//     popupWindow?.classList.remove('dark');
//     let content = document.getElementById(`${popupContentID}`);
//     content?.classList.remove('move-in');
//     content?.classList.add('move-out');
//     setTimeout(deleteContent, 325, popupWindow);
// }


// /**
//  * deletes the dark background
//  */
// function deleteDarkBackground(popupWindow) {
//     popupWindow?.classList.add('d-none');
// }


// /**
//  * deletes the content of the popup window
//  * @param {HTMLElement} popupWindow - popup window element
//  */
// function deleteContent(popupWindow) {
//     popupWindow.innerHTML = '';
//     deleteDarkBackground(popupWindow);
// }


// /**
//  * shows feedback banner after done action
//  */
// function showSuccessBanner(text) {
//     let banner = document.getElementById('successBanner');
//     banner.innerHTML = `${text}`;
//     banner?.classList.remove('move-down', 'd-none');
//     banner?.classList.add('move-up');
//     setTimeout(function () {
//         banner?.classList.remove('move-up');
//         banner?.classList.add('move-down');
//     }, 1500);
//     setTimeout(function () {
//         banner?.classList.add('d-none');
//     }, 2000);
// }


// /**
//  * shows alert banner when something isnt working
//  */
// function showFailureBanner(text) {
//     let banner = document.getElementById('failureBanner');
//     banner.innerHTML = `${text}`;
//     banner?.classList.remove('light-banner', 'd-none');
//     banner?.classList.add('dark-banner');
//     setTimeout(function () {
//         banner?.classList.remove('dark-banner');
//         banner?.classList.add('light-banner');
//     }, 2000);
//     setTimeout(function () {
//         banner?.classList.add('d-none');
//     }, 2400);
// }