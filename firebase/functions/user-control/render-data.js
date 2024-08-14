import { getDatabase, onValue, ref } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import app from '../../firebaseConfig.js';

const database = getDatabase(app);

const borrowerGroup = document.querySelector('.borrower-group');
const librarianGroup = document.querySelector('.faculty-group');
const borrowerBtn = document.getElementById('borrower-btn');
const librarianBtn = document.getElementById('librarian-btn');

loadBorrower();
loadLibrarian();
librarianBtn.addEventListener('click', () => {
  librarianGroup.style.display = 'flex';
  borrowerGroup.style.display = 'none';
});

borrowerBtn.addEventListener('click', () => {
  borrowerGroup.style.display = 'flex';
  librarianGroup.style.display = 'none';
});

function loadBorrower() {
  document.querySelector('.borrower-group .list-container').innerHTML = '';
  onValue(ref(database, 'User Info/Borrowers'), (users) => {
    Object.keys(users.val()).forEach((user) => {
      onValue(ref(database, `User Info/Borrowers/${user}`), (content) => {
        const data = content.val();
        const fullName = `${data['Full Name']['Last Name']}, ${data['Full Name']['First Name']} ${data['Full Name']['Middle Name']}`;
        createItem(fullName, data['Student Number']);
      });
    });
  });
}
function loadLibrarian() {
  document.querySelector('.faculty-group .list-container').innerHTML = '';
  onValue(ref(database, 'User Info/Staff'), (users) => {
    Object.keys(users.val()).forEach((user) => {
      onValue(ref(database, `User Info/Staff/${user}`), (content) => {
        const data = content.val();
        const fullName = `${data['lastname']}, ${data['firstname']} ${data['middlename']}`;
        itemLibrarian(fullName, data['facultyID']);
      });
    });
  });
}

function createItem(_name, _student_number) {
  const item = document.createElement('div');
  item.classList.add('item');

  const name = document.createElement('p');
  name.setAttribute('id', 'name');
  name.textContent = _name;

  const studentNumber = document.createElement('p');
  studentNumber.setAttribute('id', 'student-id');
  studentNumber.textContent = _student_number;
  item.appendChild(name);
  item.appendChild(studentNumber);
  document.querySelector('.borrower-group .list-container').appendChild(item);
}
function itemLibrarian(_name, faculty_number) {
  const item = document.createElement('div');
  item.classList.add('item');

  const name = document.createElement('p');
  name.setAttribute('id', 'name');
  name.textContent = _name;

  const studentNumber = document.createElement('p');
  studentNumber.setAttribute('id', 'student-id');
  studentNumber.textContent = faculty_number;
  item.appendChild(name);
  item.appendChild(studentNumber);

  document.querySelector('.faculty-group .list-container').appendChild(item);
}
