import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js';
import firebaseConfig from '/firebase/firebaseConfig.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js';
const app = initializeApp(firebaseConfig);
const logoutBtn = document.querySelectorAll('#logout-btn');
logoutBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    getAuth()
      .signOut()
      .then((result) => {
        location.href = '/login';
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
