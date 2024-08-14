import { getDatabase, onValue, ref, set, push } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import app from '../../firebaseConfig.js';
import createItem from '../inventory/createItem.js';

const yearLevel = document.getElementById('year');
const course = document.getElementById('course');

loadStrand(); //initial course, default value, 'grade'
const year = document.getElementById('year');
year.addEventListener('change', () => {
  course.innerHTML = '';
  if (year.value.includes('year')) {
    loadCourse();
  } else {
    loadStrand();
  }
});

function loadCourse() {
  const courses = ['BSAR', 'BSCS', 'BSENTREP', 'BSCE', 'BSCRIM'];
  courses.forEach((c) => {
    const option = document.createElement('option');
    option.setAttribute('value', c);
    option.textContent = c;
    course.appendChild(option);
  });
}

function loadStrand() {
  const strands = ['TVL', 'GHT', 'ABM', 'STEM'];
  strands.forEach((s) => {
    const option = document.createElement('option');
    option.setAttribute('value', s);
    option.textContent = s;
    course.appendChild(option);
  });
}

const form = document.querySelector('.form-container');
const submit = document.getElementById('submit-btn');

const database = getDatabase(app);

submit.addEventListener('click', (e) => {
  e.preventDefault();
  const data = {
    Name: `${form['last-name'].value}, ${form['first-name'].value} ${form['middle-name'].value}. ${form['extension'].value}.`,
    Year: form['year'].value,
    Course: form['course'].value,
    Purpose: form['purpose'].value,
    Date: getCurrentDate(),
  };
  location.href = '/dashboard.html'

  set(push(ref(database, `Visitors/${getCurrentDate()}`)), data);
 
});

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}


const search = document.querySelector('#searchbox');
fetchData('', '');
let currentQuery = '';

search.addEventListener('input', () => {
  fetchData(search.value)
})

document.getElementById('search-query').addEventListener('submit', (e) => {
  e.preventDefault()
  fetchData(search.value);
})
function fetchData(filter) {
  const booksRef = ref(database, 'Books');
  const listContainer = document.querySelector('.list-container');
  listContainer.innerHTML = '';

  onValue(booksRef, (snapshot) => {
    Object.keys(snapshot.val()).forEach((booksID) => {
      onValue(ref(database, `Books/${booksID}`), (details) => {
        const data = details.val();
        const isMatch = (
          (data['Author'].toLowerCase().includes(filter.toLowerCase()) || data['Title'].toLowerCase().includes(filter.toLowerCase()) || data['Genre'].toLowerCase().includes(filter.toLowerCase())) &&
          data['Available']
        );

        if (isMatch) {
          const genreMapping = {
            'data': 'Computer Science',
            'computer': 'Computer Science',
            'web': 'Computer Science',
            'programming': 'Computer Science',
            'game': 'Computer Science',
            'hack': 'Computer Science',
            'accounting': 'Accounting',
            'finance': 'Accounting',
            'auditing': 'Accounting',
            'taxation': 'Accounting',
            'budgeting': 'Accounting',
            'criminology': 'Criminology',
            'criminal justice': 'Criminology',
            'forensics': 'Criminology',
            'investigation': 'Criminology',
            'law enforcement': 'Criminology',
            // Add more accounting and criminology-related keywords here
          };

          const genre = Object.keys(genreMapping).find(key => data['Genre'].toLowerCase().includes(key));
          const genreLabel = genre ? genreMapping[genre] : '';

          createItem(
            data['Shelf'].replace('Shelf', 'Row'),
            data['Title'],
            data['Author'],
            genreLabel,
            data['Year'],
            data['Description'],
            '',
            data['Available']
          );
        } else {
          console.log('Not found');
        }
      });
    });
  });
}
