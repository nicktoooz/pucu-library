import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js';
import app from '../../firebaseConfig.js';
import { getDatabase, ref as dbRef, update } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';

const storage = getStorage(app);
const database = getDatabase(app);
const listContainer = document.querySelector('.list-container');

function createItem(id, title, author, genre, year, description, imgSrc, availability, lost) {
  const item = document.createElement('div');
  item.classList.add('list');

  const idElement = document.createElement('p');
  idElement.setAttribute('id', 'bookId');
  idElement.textContent = id;

  const titleElement = document.createElement('p');
  titleElement.setAttribute('id', 'title');
  titleElement.textContent = title;
  titleElement.style.color = !availability ? 'red' : '#333';

  const authorElement = document.createElement('p');
  authorElement.setAttribute('id', 'author');
  authorElement.textContent = author;

  const genreElement = document.createElement('p');
  genreElement.setAttribute('id', 'genre');
  genreElement.textContent = genre;

  item.appendChild(idElement);
  item.appendChild(titleElement);
  item.appendChild(authorElement);
  item.appendChild(genreElement);
  listContainer.appendChild(item);

  item.addEventListener('click', () => {
    if (document.getElementById('foundBtn')) {
      document.querySelector('.preview .action-buttons').removeChild(document.getElementById('foundBtn'));
    }
    if (lost) {
      const foundBtn = document.createElement('button');
      foundBtn.setAttribute('id', 'foundBtn');
      foundBtn.textContent = 'Found';
      document.querySelector('.preview .action-buttons').appendChild(foundBtn);

      foundBtn.addEventListener('click', () => {
        update(dbRef(database, `Books/${id}`), {
          Available: true,
          Lost: false,
        })
          .then(() => {
            document.querySelector('.preview .action-buttons').removeChild(document.getElementById('foundBtn'));
            document.querySelector('#availability').src = '/images/inventory/available.png';
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }

    let formattedAuthor = '';
    document.querySelector('#description').innerHTML = '';
    document.getElementById('cover').src = '';
    document.querySelector('#book-id').value = id;
    document.querySelector('.preview').style.flex = '1';
    author.split(',').forEach((e) => {
      formattedAuthor += `${e} <br>`;
    });
    document.querySelector('.preview #title').innerHTML = title;
    document.querySelector('.preview #author').innerHTML = formattedAuthor;
    document.querySelector('.preview .genre').textContent = genre;
    document.querySelector('.preview  #year').textContent = year;
    description.split('\n').forEach((line) => {
      document.querySelector('#description').innerHTML += `${line}<br>`;
    });

    document.querySelector('#availability').src = availability ? '/images/inventory/available.png' : '/images/inventory/notAvailable.png';
    getDownloadURL(ref(storage, `Book Covers/${id}.png`))
      .then((url) => {
        document.getElementById('cover').src = url;
      })
      .catch((err) => {});
  });
}

export default createItem;
