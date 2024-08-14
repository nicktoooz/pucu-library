import createItem from './createItem.js';
import app from '../../firebaseConfig.js';
import { getDatabase, onValue, ref, set, update } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js';

const database = getDatabase(app);
const storage = getStorage(app)
const overlay = document.querySelector('.overlay');
const search = document.querySelector('.search-box');
const category = document.getElementById('category');
fetchData('', '',getDateFromUrl() ? getDateFromUrl() : '');
let x = '';
let currentQuery = '';

document.getElementById('close-btn').addEventListener('click', () => {
  overlay.style.display = 'none';
});
document.getElementById('add-book').addEventListener('click', () => {
  document.getElementById('image-cover').src = '';
  overlay.style.display = 'flex';
  addBook();
  document.querySelector('.overlay-content header h1').textContent = 'Add Book';
});

document.getElementById('edit').addEventListener('click', () => {
  document.getElementById('image-cover').src = '';
  overlay.style.display = 'flex';
  editBook(document.querySelector('#book-id').value);
  document.querySelector('.overlay-content header h1').textContent = 'Edit Book';
});

category.addEventListener('change', () => {
  x = category.value;
  fetchData(currentQuery, category.value, getDateFromUrl() ? getDateFromUrl() : '');
});
search.addEventListener('input', (e) => {
  e.preventDefault();
  currentQuery = search['query'].value;
  fetchData(currentQuery, x, getDateFromUrl() ? getDateFromUrl() : '');
});



function fetchData(filter, genre, acquisitionDate) {
  console.log(filter, genre);

  onValue(ref(database, 'Books'), (snapshot) => {
  document.querySelector('.list-container').innerHTML = '';
    Object.keys(snapshot.val()).forEach((booksID) => {
      onValue(ref(database, `Books/${booksID}`), (details) => {
        const data = details.val();
        if (data['Title'].toLowerCase().includes(filter.toLowerCase()) & data['Genre'].includes(genre) & data['Acquisition Date'].includes(acquisitionDate) ) {
          createItem(booksID, data['Title'], data['Author'], data['Genre'], data['Year'], data['Description'], '', data['Available'], data['Lost']);
        } else {
          console.log('Not found');
        }
      });
    });
  });
}

const input = document.querySelector('.overlay-content form')['image'];
input.addEventListener('change', () => {
  const image = input.files[0];
  console.log(image);
  if (image) {
    if (image.type.startsWith('image/png')) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        document.getElementById('image-cover').src = evt.target.result;
      };
      reader.readAsDataURL(image);
    } else {
      alert('Please select a valid file image');
    }
  } else {
    document.getElementById('image-cover').src = '';
  }
});

function editBook(book_id) {
  const form = document.querySelector('.overlay-content form');
  const editBookBtn = document.createElement('button');
  editBookBtn.setAttribute('type', 'submit');
  editBookBtn.setAttribute('name', 'submitBtn');
  editBookBtn.setAttribute('id', 'submit-btn');
  editBookBtn.innerHTML = 'Edit Book';
  form.appendChild(editBookBtn);
  clearData();
  form['book-id'].disabled = true;

  onValue(ref(database, `Books/${book_id}`), (snapshot) => {
    const data = snapshot.val();
    form['book-id'].value = data['Book ID'];
    form['book-title'].value = data['Title'];
    form['book-author'].value = data['Author'];
    form['book-publisher'].value = data['Publisher'];
    form['book-language'].value = data['Language'];
    form['book-year'].value = data['Year'];
    form['book-genre'].value = data['Genre'];
    form['book-isbn'].value = data['ISBN'];
    form['description'].value = data['Description'];
    form['acquisition-date'].value = data['Acquisition Date'];
    form['shelf'].value = data['Shelf'];

    // Get the image from Firebase Storage and set it as the src attribute of the image element
    getDownloadURL(storageRef(storage, `Book Covers/${data['Book ID']}.png`))
      .then(url => {
        document.getElementById('image-cover').src = url;
      })
      .catch(err => {
        document.getElementById('image-cover').src = '';
      });
  });

  editBookBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Get the book ID and image file (if provided)
    const bookID = form['book-id'].value;
    const imageFile = form['image'].files[0];

    // Define the book details
    const bookDetails = {
      'Book ID': form['book-id'].value,
      'Title': form['book-title'].value,
      'Author': form['book-author'].value,
      'Publisher': form['book-publisher'].value,
      'Language': form['book-language'].value,
      'Year': form['book-year'].value,
      'Genre': form['book-genre'].value,
      'ISBN': form['book-isbn'].value,
      'Description': form['description'].value,
      'Acquisition Date': form['acquisition-date'].value,
      'Shelf': form['shelf'].value
    };

    // If an image file is provided, upload it to Firebase Storage
    if (imageFile) {
      const imagePath = storageRef(storage, `Book Covers/${bookID}.png`);
      const uploadTask = uploadBytes(imagePath, imageFile);

      uploadTask.then((snapshot) => {
        console.log('Image uploaded successfully.');
        // Now that the image is uploaded, you can update the book details in the database
        update(ref(database, `Books/${book_id}`), bookDetails)
          .then(() => {
            console.log('Book details updated successfully.');
          })
          .catch((error) => {
            console.error('Error updating book details:', error);
          });
      }).catch((error) => {
        console.error('Error uploading image:', error);
      });
    } else {
      // If no image file is provided, only update the book details in the database
      update(ref(database, `Books/${book_id}`), bookDetails)
        .then(() => {
          console.log('Book details updated successfully.');
        })
        .catch((error) => {
          console.error('Error updating book details:', error);
        });
    }
  });
}

function addBook() {
  const info = document.querySelector('.overlay-content form');
  info['book-id'].disabled = false;

  // Remove the existing submit button if it exists
  if (document.getElementById('submit-btn')) {
    document.getElementById('submit-btn').remove();
  }

  clearData();

  const addBookBtn = document.createElement('button');
  addBookBtn.setAttribute('type', 'submit');
  addBookBtn.setAttribute('name', 'submitBtn');
  addBookBtn.setAttribute('id', 'submit-btn');
  addBookBtn.innerHTML = 'Add Book';
  info.appendChild(addBookBtn);

  addBookBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    const bookID = info['book-id'].value;
    const imageFile = info['image'].files[0];
    
    // Check if bookID is provided
    if (!bookID) {
      console.log('Please provide a Book ID.');
      return;
    }

    // Set the book details in the Firebase Realtime Database
    const bookDetails = {
      'Book ID': bookID,
      'Title': info['book-title'].value,
      'Author': info['book-author'].value,
      'Publisher': info['book-publisher'].value,
      'Language': info['book-language'].value,
      'Year': info['book-year'].value,
      'Genre': info['book-genre'].value,
      'ISBN': info['book-isbn'].value,
      'Description': info['description'].value,
      'Acquisition Date': info['acquisition-date'].value,
      'Shelf': info['shelf'].value
    };

    // If an image file is provided, upload it to Firebase Storage
    if (imageFile) {
      const imagePath = storageRef(storage, `Book Covers/${bookID}.png`);
      const uploadTask = uploadBytes(imagePath, imageFile);

      uploadTask.then((snapshot) => {
        console.log('Image uploaded successfully.');
        // Now that the image is uploaded, you can update the book details in the database
        set(ref(database, `Books/${bookID}`), bookDetails)
          .then(() => {
            console.log('Book details updated successfully.');
          })
          .catch((error) => {
            console.error('Error updating book details:', error);
          });
      }).catch((error) => {
        console.error('Error uploading image:', error);
      });
    } else {
      // If no image file is provided, only update the book details in the database
      set(ref(database, `Books/${bookID}`), bookDetails)
        .then(() => {
          console.log('Book details updated successfully.');
        })
        .catch((error) => {
          console.error('Error updating book details:', error);
        });
    }
  });
}

function clearData() {
  for (const input of document.querySelector('.overlay-content form').elements) {
    input.value = ''
  }

}
function getDateFromUrl() {
return new URL(window.location.href).searchParams.get('date')
}