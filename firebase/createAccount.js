import app from './firebaseConfig.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';

const auth = getAuth(app);
const form = document.querySelector('form');

const overlay = document.querySelector('.overlay');
const loadingOverlay = document.querySelector('.loading-overlay');
const overlayContent = document.querySelector('.overlay-content');
const proceedBtn = document.querySelector('#proceedBtn');
form['submit'].addEventListener('click', (e) => {
  loadingOverlay.style.display = 'flex';
  e.preventDefault();
  createUserWithEmailAndPassword(auth, form['email'].value, form['password'].value)
    .then((ucred) => {
      console.log(ucred);
      setTimeout(() => {
        loadingOverlay.style.display = 'none';
        location.replace('login.html')
      }, 3000);
    })
    .catch((err) => {
      console.log(err);
    });
});
overlay.addEventListener('click', (e) => {
  if (e.target.className == 'overlay') {
    overlay.style.display = 'none';
  }
});
overlayContent.addEventListener('click', (e) => {
  e.stopPropagation();
});
proceedBtn.addEventListener('click', (e) => {
  e.preventDefault();
  overlay.style.display = 'none';
});
