// main.js

import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';
import app from '../../firebaseConfig.js'; // Adjust the path as needed

const auth = getAuth(app);

document.getElementById('logout-btn').addEventListener('click', () => {
  logoutAndRedirect();
});

function logoutAndRedirect() {
  signOut(auth)
    .then(() => {
      window.location.href = '/login.html';
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
    });
}
