const contactList = document.querySelector(".contact-list");
const [addForm, editForm] = document.forms;
const cancelBtn = editForm.querySelector(".btn-cancel");
const addContactBtn = document.querySelector(".add-contact__new-contact-btn");
const contactItemTricolon = document.querySelector(".contact-item__tricolon");
const editBtn = document.querySelector(".contact-item__edit-item-btn");
const deleteBtn = document.querySelector(".contact-item__delete-item-btn");
const backdrop = document.querySelector(".backdrop");

const showForms = () => {
  addForm.hidden = false;
  editBtn.hidden = false;
  backdrop.hidden = false;
};

const hideForms = () => {
  addForm.hidden = true;
  editForm.hidden = true;
  backdrop.hidden = true;
};

const addContact = async (contact) => {
  contact.id = Date.now();

  await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(contact),
  })

  getContacts().then((contactsData) => {
    contacts.splice(0, contacts.length, ...contactsData);
    contactList.innerHTML = render(contacts);
  });
};

const updateContactCard = (contact) => {
  const contactCard = document.querySelector(`[data-id='${contact.id}']`);
  contactCard.querySelector(".contact-item__name").textContent = contact.name;
  contactCard.querySelector(".contact-item__position").textContent = contact.position;
  contactCard.querySelector(".contact-item__company").textContent = contact.company;
  contactCard.querySelector(".contact-item__contact-info.phone").textContent = contact.phone;
  contactCard.querySelector(".contact-item__contact-info.email").textContent = contact.email;
  contactCard.querySelector(".contact-item__img").src = contact.image;

  // Object.entries(contact).forEach(([key, value]) => {
  //   editForm.elements[key].value = value;
  // });
};

const showContactBtn = (e) => {
  const tricolonBtn = e.target.closest(".contact-item__tricolon-btn");
  if (tricolonBtn) {
    const toggle = tricolonBtn.nextElementSibling;
    toggle.checked = !toggle.checked;
  }
}

const deleteContact = async (e) => {
  const contactCard = e.target.closest(".contact-item");

  await fetch('/api/contact', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: contactCard.getAttribute("data-id") }),
  });

  contactCard.remove();
};

const closeForms = (e) => {
  if (e.target === backdrop || e.target === cancelBtn) {
    hideForms();
  }
};

const handleAdd = (e) => {
  e.preventDefault();

  const contact = Object.fromEntries(new FormData(addForm));

  const reader = new FileReader();
  reader.onloadend = () => {
    contact.image = reader.result;

    addContact(contact);
    hideForms();
  }
  reader.readAsDataURL(contact.image);
};

const handleEdit = (e) => {
  const contactCard = e.target.closest(".contact-item");
  const contactCardId = contactCard.getAttribute("data-id");
  const contact = contacts.find((contact) => contact.id == contactCardId);

  if (contact) {
    editForm.hidden = false;
    backdrop.hidden = false;

    Object.entries(contact).forEach(([key, value]) => {
      try {
        editForm.elements[key].value = value;
      } catch {
      }
    });
  }
};

const handleSave = async (e) => {
  e.preventDefault();

  const updatedContact = {
    id: editForm.elements['id'].value,
    name: editForm.elements['name'].value,
    position: editForm.elements['position'].value,
    company: editForm.elements['company'].value,
    phone: editForm.elements['phone'].value,
    email: editForm.elements['email'].value,
    image: editForm.elements['image'].files[0],
  };

  if (!updatedContact.image) {
    delete updatedContact.image;

    await fetch('/api/contact', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedContact),
    });

    updateContactCard(updatedContact);

  } else {
    const reader = new FileReader();

    reader.onloadend = async () => {
      updatedContact.image = reader.result;

      await fetch('/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContact),
      });

      updateContactCard(updatedContact);
    }

    reader.readAsDataURL(updatedContact.image);
  }
};

const handleClick = (e) => {
  if (e.target.closest(".contact-item__tricolon-btn")) {
    showContactBtn(e);
  } else if (e.target.closest(".contact-item__edit-item-btn")) {
    handleEdit(e);
  } else if (e.target.closest(".contact-item__delete-item-btn")) {
    deleteContact(e);
  }
};

const getContacts = async () => {
  const response = await fetch('/api/contacts');
  const contacts = await response.json();

  return contacts;
};

getContacts().then((contactsData) => {
  contacts.splice(0, contacts.length, ...contactsData);
  contactList.innerHTML = render(contactsData);
});

addForm.addEventListener("submit", handleAdd);
editForm.addEventListener("submit", handleSave);
addContactBtn.addEventListener("click", showForms);
contactList.addEventListener("click", handleClick);
backdrop.addEventListener("click", closeForms);