import { getDatabase, onValue, ref, set, push, update } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import app from '../../firebaseConfig.js';
const container = document.querySelector('.list-container');
const overlay = document.querySelector('.overlay');
const bookList = document.querySelector('.book-list-container');
const database = getDatabase(app);
const overlayClose = document.getElementById('close-btn');
const overlayAction = document.querySelector('.overlay footer');
overlayClose.addEventListener('click', () => {
  overlay.style.display = 'none';
});
onValue(ref(database, `Borrowed Books`), (_users) => {
  container.innerHTML = '';
  Object.keys(_users.val()).forEach((user) => {
    onValue(ref(database, `Borrowed Books/${user}`), (_transactions) => {
      Object.keys(_transactions.val()).forEach((transaction) => {
        onValue(ref(database, `Borrowed Books/${user}/${transaction}`), (content) => {
          const data = content.val();
          console.log(content.val());
          if (data['Status'].includes('active')) {
            createItem(transaction, user, data['Date Created'], data['Books'], data['Status'], data['Note'], data['Due Date']);
          }
        });
      });
    });
  });
});

function createItem(_id, _user, _date, _books, status, note, dueDate) {
  const item = document.createElement('div');
  item.classList.add('item');

  onValue(ref(database, `User Info/Borrowers/${_user}`), (snapshot) => {
    const data = snapshot.val();
    document.getElementById('name').textContent += `${data['Full Name']['Last Name']}, ${data['Full Name']['First Name']} ${data['Full Name']['Middle Name']}`;
    document.getElementById('year').textContent += data['Year'];
    document.getElementById('course').textContent += data['Course'];
    document.getElementById('email').textContent += data['Email Address'];
    document.getElementById('note').textContent += note
    document.getElementById('due').textContent +=dueDate

  });

  const id = document.createElement('p');
  id.setAttribute('id', 'request-id');
  id.textContent = _id;

  const from = document.createElement('p');
  from.setAttribute('id', 'from');
  onValue(ref(database, `User Info/Borrowers/${_user}`), (_info) => {
    const info = _info.val()['Full Name'];
    from.textContent = `${info['Last Name']}, ${info['First Name']} ${info['Middle Name']}`;
  });

  const stat = document.createElement('p')
  stat.setAttribute('id', 'status')
  stat.textContent = status.charAt(0).toUpperCase() + status.slice(1)
  const date = document.createElement('p');
  date.setAttribute('id', 'date');
  date.textContent = _date;
  item.appendChild(id);
  item.appendChild(from);
  item.appendChild(date);
  item.appendChild(stat)
  container.appendChild(item);
  item.addEventListener('click', () => {
    overlayAction.innerHTML = '';
    bookList.innerHTML = '';
    overlay.style.display = 'flex';

    Object.keys(_books).forEach((e) => {
      createBookItem(e);
    });
  });
}

function createBookItem(_id) {
  const item = document.createElement('div');
  item.classList.add('book-item');
  const title = document.createElement('p');
  title.setAttribute('id', 'title');

  const author = document.createElement('p');
  author.setAttribute('id', 'author');

  const genre = document.createElement('p');
  genre.setAttribute('id', 'genre');

  onValue(ref(database, `Books/${_id}`), (snapshot) => {
    const info = snapshot.val();
    title.textContent = info['Title'];
    author.textContent = info['Author'];
    genre.textContent = info['Genre'];
  });

  item.appendChild(title);
  item.appendChild(author);
  item.appendChild(genre);
  bookList.appendChild(item);
  
}

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function updateData(id, user, state) {
  update(ref(database, `Borrowed Books/${user}/${id}`), {
    Status: state,
    'Date Updated': getCurrentDate(),
  });
}

function notify(_title, _body, _token, _channel) {
  const data = {
    title: _title,
    body: _body,
    token: _token,
    channel_id: _channel,
  };
  fetch('http://127.0.0.1:5505/api/send-notification', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error(error);
    });
}
function getFutureDate() {
  const today = new Date();
  today.setDate(today.getDate() + 14);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
