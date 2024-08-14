import { getDatabase, onValue, ref, set, push, update } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import app from '../../firebaseConfig.js';
const container = document.querySelector('.request-list');
const preview = document.querySelector('.preview');
const borrowedList = document.querySelector('.borrowed-list');
document.getElementById('continue-btn').addEventListener('click', () => {
  preview.style.display = 'none';
  document.querySelector('.result').style.display = 'none';
  if (!document.querySelector('.result h1').textContent.includes('rejected')) {
    location.href = '/accepted-requests.html';
  }
});

const database = getDatabase(app);
let path = '';

renderData();

function renderData() {
  onValue(ref(database, `Borrowed Books`), (_users) => {
    container.innerHTML = '';
    Object.keys(_users.val()).forEach((user) => {
      onValue(ref(database, `Borrowed Books/${user}`), (_transactions) => {
        Object.keys(_transactions.val()).forEach((transaction) => {
          onValue(ref(database, `Borrowed Books/${user}/${transaction}`), (_content) => {
            const data = _content.val();
            if (data['Status'] == 'pending') {
              createRequestItem(transaction, data['Date Created'], user, data['Status']);
            }
          });
        });
      });
    });
  });
}

function createRequestItem(_id, _date, user, status) {
  const item = document.createElement('div');
  item.classList.add('list-item');

  const requestId = document.createElement('p');
  requestId.setAttribute('id', 'request-id');
  requestId.textContent = _id;

  const name = document.createElement('p');
  name.setAttribute('id', 'from');
  onValue(ref(database, `User Info/Borrowers/${user}`), (_info) => {
    const info = _info.val()['Full Name'];
    name.textContent = `${info['Last Name']}, ${info['First Name']} ${info['Middle Name']}`;
  });

  const date = document.createElement('p');
  date.setAttribute('id', 'date');
  date.textContent = _date;

  const stat = document.createElement('p');
  stat.setAttribute('id', 'status');
  stat.textContent = status.charAt(0).toUpperCase() + status.slice(1);

  item.appendChild(requestId);
  item.appendChild(name);
  item.appendChild(date);
  item.appendChild(stat);
  container.appendChild(item);

  item.addEventListener('click', () => {
    document.querySelector('.main-preview header h1').textContent = _id;
    preview.style.display = 'flex';
    path = `Borrowed Books/${user}/${_id}`;
    createActionButtons(path, _id, user);
    renderPreview(user, _id);
    onValue(ref(database, `User Info/Borrowers/${user}`), (snapshot) => {
      const data = snapshot.val();
      document.getElementById('name').textContent += `${data['Full Name']['Last Name']}, ${data['Full Name']['First Name']} ${data['Full Name']['Middle Name']}`;
      document.getElementById('year').textContent += data['Year'];
      document.getElementById('course').textContent += data['Course'];
      document.getElementById('email').textContent += data['Email Address'];
    });
  });
}

function createActionButtons(path, id, user) {
  const action = document.querySelector('.preview footer');
  action.innerHTML = '';
  const accept = document.createElement('button');
  const reject = document.createElement('button');
  reject.setAttribute('id', 'reject');
  reject.textContent = 'Reject';
  accept.setAttribute('id', 'accept');
  accept.textContent = 'Accept';
  action.appendChild(accept);
  action.appendChild(reject);
  accept.addEventListener('click', () => {
    updateState(path, 'in-progress');
    set(push(ref(database, `Notifications/${user}`)), {
      Title: 'Request Accepted',
      Body: 'Your request has been accepted',
      For: id,
      Date: getCurrentDate(),
    });

    onValue(ref(database, `User Info/Borrowers/${user}/FCMTOKENS`), (token) => {
      for (const key in token.val()) {
        notify('Request Accepted', 'Your request has been accepted', token.val()[key], 'REQUEST_STATUS_CHANNEL');
      }
    });
    document.querySelector('.result').style.display = 'flex';
    document.querySelector('.result h1').textContent = 'The request has been accepted';
  });
  reject.addEventListener('click', () => {
    updateState(path, 'rejected');

    set(push(ref(database, `Notifications/${user}`)), {
      Title: 'Request Rejected',
      Body: 'Your request has been rejected',
      For: id,
      Date: getCurrentDate(),
    });

    onValue(ref(database, `User Info/Borrowers/${user}/FCMTOKENS`), (token) => {
      for (const key in token.val()) {
        notify('Request Rejected', 'Your request has been rejected', token.val()[key], 'REQUEST_STATUS_CHANNEL');
      }
    });
    document.querySelector('.result').style.display = 'flex';
    document.querySelector('.result h1').textContent = 'The request has been rejected';
  });
}

function renderPreview(_user, _transaction) {
  borrowedList.innerHTML = '';

  onValue(ref(database, `Borrowed Books/${_user}/${_transaction}`), (books) => {
    document.getElementById('note').textContent += books.val()['Note'];
    Object.keys(books.val()['Books']).forEach((key) => {
      onValue(ref(database, `Books/${key}`), (info) => {
        const item = document.createElement('div');
        item.classList.add('list-item');
        const title = document.createElement('p');
        const author = document.createElement('p');
        title.setAttribute('id', 'book-title');
        author.setAttribute('id', 'book-author');
        title.textContent = info.val()['Title'];
        author.textContent = info.val()['Author'];
        item.appendChild(title);
        item.appendChild(author);
        borrowedList.appendChild(item);
      });
    });
  });
}
function updateState(path, state) {
  borrowedList.innerHTML = '';
  update(ref(database, path), {
    Status: state,
  });
  onValue(ref(database, `${path}/Books`), (snapshot) => {
    Object.keys(snapshot.val()).forEach((books) => {
      update(ref(database, `Books/${books}`), {
        Available: true,
      });
    });
  });
  console.log('Updated');
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

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
