// import { getDatabase, onValue, ref, set, update } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
// import app from '../../firebaseConfig.js';
// const database = getDatabase(app);

// const search = document.querySelector('#searchbox');
// fetchData('', '');
// let currentQuery = '';

// search.addEventListener('input', (e) => {
//   e.preventDefault();
//   currentQuery = search.value;
//   fetchData(currentQuery);
// });

// function fetchData(filter) {
// console.log(filter);
//   onValue(ref(database, 'Books'), (snapshot) => {
//     document.querySelector('.list-container').innerHTML = '';
//     Object.keys(snapshot.val()).forEach((booksID) => {
//       onValue(ref(database, `Books/${booksID}`), (details) => {
//         const data = details.val();
//         if (data['Title'].toLowerCase().includes(filter.toLowerCase()) & data['Genre'].toLowerCase().includes(filter.toLowerCase())) {
//           createItem(booksID, data['Title'], data['Author'], data['Genre'], data['Year'], data['Description'], '', data['Available']);
//         } else {
//           console.log('Not found');
//         }
//       });
//     });
//   });
// }
