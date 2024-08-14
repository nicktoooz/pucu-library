import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';
import app from '../firebase/firebaseConfig.js';

const auth = getAuth(app);

document.querySelector('#login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = '/dashboard.html';
  } catch (error) {
    console.error(error);
  }
});
