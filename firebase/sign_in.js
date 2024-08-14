import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js';
import firebaseConfig from '/firebase/firebaseConfig.js';
const app = initializeApp(firebaseConfig)
const auth = getAuth(app);




document.getElementById('login_btn').addEventListener('click', (e) => {
  e.preventDefault();
  let authCredentials = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
  };
  
  signInWithEmailAndPassword(auth, authCredentials.email, authCredentials.password)
    .then((userCredentials) => {
      console.log('Success');
      location.href = '/dashboard';
    })
    .catch((error) => {
      console.log(error);
    });
});
