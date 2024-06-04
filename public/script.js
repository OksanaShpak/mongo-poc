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

  getContacts().then((contacts) => {
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


  Object.entries(contact).forEach(([key, value]) => {
    editForm.elements[key].value = value;
  });
};

const showContactBtn = (e) => {
  const tricolonBtn = e.target.closest(".contact-item__tricolon-btn");
  if (tricolonBtn) {
    const toggle = tricolonBtn.nextElementSibling;
    toggle.checked = !toggle.checked;
  }
}

const deleteContact = (e) => {
  const contactCard = e.target.closest(".contact-item");
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

  addContact(contact);
  hideForms();
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

const handleSave = (e) => {
  e.preventDefault();

  const updatedContact = {
    id: editForm.elements['id'].value,
    name: editForm.elements['name'].value,
    position: editForm.elements['position'].value,
    company: editForm.elements['company'].value,
    phone: editForm.elements['phone'].value,
    email: editForm.elements['email'].value,
  };

  updateContactCard(updatedContact);
};

const handleClick = (e) => {
  console.log(e.target, 'e.target');
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

getContacts().then((contacts) => {
  contactList.innerHTML = render(contacts);
});

addForm.addEventListener("submit", handleAdd);
editForm.addEventListener("submit", handleSave);
addContactBtn.addEventListener("click", showForms);
contactList.addEventListener("click", (e) => { handleClick(e) });
backdrop.addEventListener("click", closeForms);

