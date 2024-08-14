import app from '../firebaseConfig.js';
import { getDatabase, onValue, ref, update, set, push } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
const book_list_container = document.querySelector('.borrowed-book-list-container');
const container = document.querySelector('.list-container-main-content');
const preview = document.querySelector('.preview-section');
const filter = document.getElementById('filter');

filter.addEventListener('change', () => {
  fetchData(filter.value);
});

const database = getDatabase(app);
fetchData('pending');

function fetchData(filter) {
  onValue(ref(database, `Borrowed Books`), (_users) => {
    container.innerHTML = '';
    Object.keys(_users.val()).forEach((users) => {
      onValue(ref(database, `Borrowed Books/${users}`), (_transactions) => {
        Object.keys(_transactions.val()).forEach((transactions) => {
          
          onValue(ref(database, `Borrowed Books/${users}/${transactions}`), (_) => {
            if (_.val()['Status'] == filter || filter == '*') {
              const data = _.val();
              const list_item = document.createElement('div');
              list_item.classList.add('list-item');

              const topSection = document.createElement('div');
              topSection.classList.add('top');

              const requestID = document.createElement('p');
              requestID.setAttribute('id', 'rid');
              requestID.textContent = transactions;

              const date = document.createElement('p');
              date.setAttribute('id', 'date');
              date.textContent = 'date here';

              topSection.appendChild(requestID);
              topSection.appendChild(date);

              const name = document.createElement('p');
              name.setAttribute('id', 'name');
              name.textContent = 'Sample';

              list_item.appendChild(topSection);
              list_item.appendChild(name);
              container.appendChild(list_item);

              list_item.addEventListener('click', () => {
                preview.style.display = 'flex';
                document.getElementById('request-id').textContent = transactions;
                book_list_container.innerHTML = '';

                document.getElementById('accept-btn').addEventListener('click', (e) => {
                  e.preventDefault();
                  update(ref(database, `Borrowed Books/${users}/${transactions}`), {
                    Status: 'in-progress',
                  });

                  set(push(ref(database, `Notifications/${users}`)), {
                    Title: 'Request Accepted',
                    Body: 'Your request has been accepted',
                    For: transactions,
                    Date: getCurrentDate(),
                  });

                  fetchData(filter);

                  document.querySelector('.completed').style.display = 'flex';
                  document.getElementById('message').textContent = 'The request has been accepted';
                  onValue(ref(database, `User Info/Borrowers/${users}/FCMTOKENS`), (token) => {
                    //TODO : NOTIFY THE USER HERE
                    for (const key in token.val()) {
                      fcmData('Request accepted!', 'Your request has been accepted', token.val()[key], 'REQUEST_STATUS_CHANNEL');
                    }
                  });
                  document.getElementById('continue-btn').addEventListener('click', () => {
                    document.querySelector('.completed').style.display = 'none';
                    preview.style.display = 'none';
                  });
                });
                document.getElementById('reject-btn').addEventListener('click', (em) => {
                  em.preventDefault();
                  update(ref(database, `Borrowed Books/${users}/${transactions}`), {
                    Status: 'rejected',
                  });
                  set(push(ref(database, `Notifications/${users}`)), {
                    Title: 'Request Rejected',
                    Body: 'Your request has been rejected',
                    For: transactions,
                    Date: getCurrentDate(),
                  });
                  fetchData(filter);
                  document.querySelector('.completed').style.display = 'flex';
                  document.getElementById('message').textContent = 'The request has been rejected';
                  onValue(ref(database, `User Info/Borrowers/${users}/FCMTOKENS`), (token) => {
                    //TODO : NOTIFY THE USER HERE
                    for (const key in token.val()) {
                      fcmData('Request rejected!', 'Your request has been rejected', token.val()[key], 'OVERDUE_CHANNEL');
                    }
                  });

                  document.getElementById('continue-btn').addEventListener('click', () => {
                    document.querySelector('.completed').style.display = 'none';
                    preview.style.display = 'none';
                  });
                });

                const b_name = document.getElementById('borrower-name');
                const b_year = document.getElementById('borrower-year');
                const b_course = document.getElementById('borrower-course');
                const b_section = document.getElementById('borrower-section');

                b_name.textContent = '';
                b_year.textContent = '';
                b_course.textContent = '';
                b_section.textContent = '';

                onValue(ref(database, `User Info/Borrowers/${users}`), (details) => {
                  console.log(details.val());
                  b_name.textContent = `${details.val()['Full Name']['Last Name']}, ${details.val()['Full Name']['First Name']} ${details.val()['Full Name']['Middle Name']}`;
                  b_year.textContent = details.val()['Year'];
                  b_course.textContent = details.val()['Course'];
                  b_section.textContent = details.val()['Section'];
                });

                Object.keys(data['Books']).forEach((book) => {
                  onValue(ref(database, `Books/${book}`), (snapshot) => {
                    console.log(snapshot.val());
                    const book_item = document.createElement('div');
                    book_item.classList.add('book-item');

                    const title = document.createElement('p');
                    title.setAttribute('id', 'book-title');
                    title.textContent = snapshot.val()['Title'];

                    const author = document.createElement('p');
                    author.setAttribute('id', 'book-author');
                    author.textContent = snapshot.val()['Author'];

                    book_item.appendChild(title);
                    book_item.appendChild(author);
                    book_list_container.appendChild(book_item);
                  });
                });
              });
            }
          });
        });
      });
    });
  });
}

function fcmData(_title, _body, _token, _channel) {
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
    .then((result) => {})
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

function renderData(data, filter) {
  data.forEach((e) => {
    if (e.status == filter || filter == '*') {
      const list_item = document.createElement('div');
      list_item.classList.add('list-item');

      const topSection = document.createElement('div');
      topSection.classList.add('top');

      const requestID = document.createElement('p');
      requestID.setAttribute('id', 'rid');
      requestID.textContent = e.id;

      const date = document.createElement('p');
      date.setAttribute('id', 'date');
      date.textContent = 'date here';

      topSection.appendChild(requestID);
      topSection.appendChild(date);

      const name = document.createElement('p');
      name.setAttribute('id', 'name');
      name.textContent = e.profile.name;

      list_item.appendChild(topSection);
      list_item.appendChild(name);
      container.appendChild(list_item);

      list_item.addEventListener('click', () => {
        preview.style.display = 'flex';
        document.getElementById('request-id').textContent = e.id;
        book_list_container.innerHTML = '';

        const b_name = document.getElementById('borrower-name');
        const b_year = document.getElementById('borrower-year');
        const b_course = document.getElementById('borrower-course');
        const b_section = document.getElementById('borrower-section');
        b_name.textContent = '';
        b_year.textContent = '';
        b_course.textContent = '';
        b_section.textContent = '';

        b_name.textContent = e.profile.name;
        b_year.textContent = e.profile.year;
        b_course.textContent = e.profile.course;
        b_section.textContent = e.profile.section;

        e.books.forEach((book) => {
          const book_item = document.createElement('div');
          book_item.classList.add('book-item');

          const title = document.createElement('p');
          title.setAttribute('id', 'book-title');
          title.textContent = book.title;

          const author = document.createElement('p');
          author.setAttribute('id', 'book-author');
          author.textContent = book.author;

          book_item.appendChild(title);
          book_item.appendChild(author);
          book_list_container.appendChild(book_item);
        });
      });
    }
  });
}
