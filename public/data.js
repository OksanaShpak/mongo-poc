const contacts = [
  // {
  //   id: 1,
  //   image: 'https://randomuser.me/api/portraits/men/1.jpg',
  //   name: 'John Doe',
  //   position: 'Software Engineer',
  //   company: 'MongoDB',
  //   email: 'johndoe@example.com',
  //   phone: '555-555-5555',
  // }, {
  //   id: 2,
  //   image: 'https://randomuser.me/api/portraits/men/2.jpg',
  //   name: 'Jane Doe',
  //   position: 'Software Engineer',
  //   company: 'MongoDB',
  //   email: 'janedoe@example.com',
  //   phone: '555-555-5556',
  // }, {
  //   id: 3,
  //   image: 'https://randomuser.me/api/portraits/men/3.jpg',
  //   name: 'John Doe',
  //   position: 'Software Engineer',
  //   company: 'MongoDB',
  //   email: 'johndoe@example.com',
  //   phone: '555-555-5557',
  // }
]

const render = (contacts) => {
  return contacts.map((contact) => {
    return `
    <li class="contact-item" role="article" data-id="${contact.id}">
    <div class="contact-item__tricolon">
      <button class="contact-item__tricolon-btn" type="button" aria-label="Edit contact">
        <svg aria-hidden="true" focusable="false" class="contact-item__tricolon-btn-icon" fill="none"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <title>More</title>
          <circle cx="12.5" cy="3.5" r="2.5" fill="#A5A5A5" />
          <circle cx="12.5" cy="11.5" r="2.5" fill="#A5A5A5" />
          <circle cx="12.5" cy="19.5" r="2.5" fill="#A5A5A5" />
        </svg>
      </button>

      <input type="checkbox" name="" class="toggle" hidden>
      <!-- TODO fixed class -->
      <div class="contact-btns">
        <button class="contact-item__edit-item-btn" type="button">
          <span class="">Edit</span>
        </button>
        <button class="contact-item__delete-item-btn" type="button">
          <span class="">Delete</span>
        </button>
      </div>
    </div>
    <img class="contact-item__img" src="${contact.image}" alt="Profile picture of ${contact.name}">
    <article class="contact-item__name-container">
      <h6 class="contact-item__name">${contact.name}</h6>
      
      <span class="contact-item__position">${contact.position} </span><span>at </span><span class="contact-item__company">${contact.company}</span>
    </article>
    <div class="contact-item__contact phone">
      <div class="contact-item__icon-wrapper">
        <svg class="contact-item__icon" aria-hidden="true" focusable="false" fill="none"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Phone Icon</title>
          <path
            d="m16.296 13.337-2.024-1.415a1.562 1.562 0 0 0-2.176.387l-.47.674c-.788-.529-1.667-1.266-2.505-2.104-.838-.838-1.575-1.716-2.103-2.504l.673-.47a1.55 1.55 0 0 0 .645-1.008 1.556 1.556 0 0 0-.258-1.168L6.664 3.704a1.564 1.564 0 0 0-1.277-.675c-.174 0-.345.03-.508.09a2.803 2.803 0 0 0-.527.259l-.28.197c-.07.054-.134.114-.197.176-.34.34-.583.772-.72 1.283-.582 2.184.862 5.487 3.593 8.219 2.294 2.293 5.05 3.718 7.191 3.718a3.99 3.99 0 0 0 1.028-.127c.51-.136.942-.378 1.283-.72.062-.061.121-.126.185-.208l.197-.281c.096-.154.18-.326.25-.513.237-.644-.003-1.378-.586-1.785Z"
            fill="#6418C3" />
        </svg>
      </div>
      <span class="contact-item__contact-info phone">${contact.phone}</span>
    </div>
    <div class="contact-item__contact">
      <div class="contact-item__icon-wrapper">
        <svg class="contact-item__icon" aria-hidden="true" focusable="false" fill="none"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Email Icon</title>
          <path d="m10 9.884 8.13-4.435A4.158 4.158 0 0 0 14.168 2.5H5.833A4.158 4.158 0 0 0 1.87 5.45L10 9.883Z"
            fill="#6418C3" />
          <path
            d="M10.4 11.565a.834.834 0 0 1-.8 0L1.668 7.237v6.096A4.172 4.172 0 0 0 5.833 17.5h8.334a4.172 4.172 0 0 0 4.166-4.167V7.237L10.4 11.565Z"
            fill="#6418C3" />
        </svg>
      </div>
      <span class="contact-item__contact-info email">${contact.email}</span>
    </div>
  </li>
    `
  }).join('')
}

contactList.innerHTML = render(contacts);