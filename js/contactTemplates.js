function firstLetterHTML(letter) {
    return `
    <div id="${letter}" class="flex-column width-500">
        <div class="first-letter">${letter}</div>
    </div>
    `;
}


function contactBoxHTML(contact, i) {
    return `
    <div id="contactBox${i}" class="contact-box" onclick="stopPropagation(event); openDetailedContactCard(${i})">
        <div id="contactBoxInitials${i}" class="contact-box-initials" style="background-color:${contact['color']};">
            ${contact['initials']}
        </div>
        <div class="contact-box-name">
            ${contact['firstname']} ${contact['lastname']}<br>
            <a href="mailto:${contact['mail']}">${contact['mail']}</a>
        </div>
    </div>
    `;
}


function openContactTemplate(i) {
    return `
    <div class="d-flex">
        <div id="initialen-${i}" class="initials-big" style="background-color:${contacts[i]['color']};">
            ${contacts[i]['initials']}
        </div>
        <div class="contact-name-big flex-column">
            ${contacts[i]['firstname']} ${contacts[i]['lastname']}
            <div class="add-task-btn" onclick="showAddTaskWindow()"> 
                <img src="../img/plus_lightblue.png">
                <span>Add Task</span> 
            </div>
        </div>
    </div>
    <div class="edit-contact-section">
        Contact Information 
        <span id="editContact" class="edit-contact" onclick="openEditContact(${i})">
            <img src="../img/pencil.png"> Edit Contact
        </span>
    </div>
    <div class="contact-email flex-column">
        <b>Email</b>
        <a href="mailto:${contacts[i]['mail']}">${contacts[i]['mail']}</a>
    </div>
    <div class="contact-phone flex-column">
        <b>Phone</b>
        <span>${contacts[i]['phone']}</span>
    </div> 
    <div id="editContactBtnBox" class="edit-and-delete-box edit-and-delete-box-adjustment">
        <img src="../img/delete.png" class="delete-btn" 
            onclick="deleteContact(${contacts[i]['ID']})">
        <img src="../img/pencil_white.png" class="edit-btn" onclick="openEditContact(${i})">
    </div>
    `;
}


function addContactTemplate() {
    return `
    <div id="addContactPopup" class="add-contact-popup" onclick="stopPropagation(event)">
        <div class="add-contact-popup-left">
            <div class="flex-column add-contact-headline-container">
                <img src="../img/join-for-add-contacts.png">
                <div class="add-contact-headline">
                    <span class="add-contact-headline-top">Add Contact</span>
                    <span>Tasks are better with a team!</span>
                </div>
            </div>
        </div>
        <div class="add-contact-popup-right">
            <img src="../img/close.png" class="close-add-contact-btn" onclick="closePopupWindow()">
            <div class="add-contact-img">
                <img src="../img/profile.png" class="mt-100negative add-contact-initials">
            </div>
            <form class="add-contact-form-container" onsubmit="createNewContact(); return false">
                <div class="p-relative">
                    <input required id="createContactFirstname" class="add-contact-form" placeholder="Firstname" type="text">
                    <img src="../img/human-profile.png" class="input-icon">
                </div>
                <div class="p-relative">
                    <input required id="createContactSurname" class="add-contact-form" placeholder="Lastname" type="text">
                    <img src="../img/human-profile.png" class="input-icon">
                </div>
                <div class="p-relative">
                    <input required  id="createContactMail" class="add-contact-form" placeholder="Email" type="email">
                    <img src="../img/mail-icon.png" id="mail-icon" class="input-icon mail-icon-adjustment">
                </div>
                <div class="p-relative">
                    <input required id="createContactPhone" class="add-contact-form" placeholder="Phone" type="number">
                    <img src="../img/phone-icon.png" class="input-icon">
                </div>
                <div class="add-btn-container">
                    <div class="cancel-create-contact-btn" onclick="closePopupWindow()">Cancel</div>
                    <button class="create-contact-btn-popup" type="submit">Create Contact</button>
                </div>
            </form>
        </div>
    </div>
    `;
}

function editContactTemplate() {
    return `
    <div id="editContactPopup" class="edit-contact-popup" onclick="stopPropagation(event)">
        <div class="edit-contact-popup-left">
            <div class="flex-column edit-contact-headline-container">
                <img src="../img/join-for-add-contacts.png">
                <span class="edit-contact-headline-top">Edit Contact</span>
            </div>
        </div>
        <div class="edit-contact-popup-right">
            <img src="../img/close.png" class="close-edit-contact-btn" onclick="closePopupWindow()">
            <div class="edit-contact-img">
                <div class="edit-contact-initials mt-100negative" style="background-color:${contacts[shownContactIndex]['color']};">
                    ${contacts[shownContactIndex]['initials']}
                </div>
            </div>
            <form class="edit-contact-form-container" onsubmit="changeContactsData(${contacts[shownContactIndex]['ID']}); return false">
                <div class="p-relative">
                    <input required id="editContactFirstname" class="add-contact-form" placeholder="Firstname" 
                        type="text" value="${contacts[shownContactIndex]['firstname']}">
                    <img src="../img/human-profile.png" class="input-icon">
                </div>
                <div class="p-relative">
                    <input required id="editContactSurname" class="add-contact-form" placeholder="Lastname"
                        type="text" value="${contacts[shownContactIndex]['lastname']}">
                    <img src="../img/human-profile.png" class="input-icon">
                </div>
                <div class="p-relative">
                    <input required id="editContactMail" class="add-contact-form" placeholder="Email" 
                        type="email" value="${contacts[shownContactIndex]['mail']}">
                    <img src="../img/mail-icon.png" class="input-icon mail-icon-adjustment">
                </div>
                <div class="p-relative">
                    <input required id="editContactPhone" class="add-contact-form" placeholder="Phone" 
                        type="number" value="${contacts[shownContactIndex]['phone']}">
                    <img src="../img/phone-icon.png" class="input-icon">
                </div>
                <div class="add-btn-container">
                    <div class="delete-contact-btn" onclick="deleteContact(${contacts[shownContactIndex]['ID']})">Delete</div>
                    <button class="edit-contact-btn" type="submit">Save</button>
                </div>
            </form>
        </div>
    </div>
    `;
}