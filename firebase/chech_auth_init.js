import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js';
import firebaseConfig from '/firebase/firebaseConfig.js';
const app = initializeApp(firebaseConfig);
onAuthStateChanged(getAuth(), (user) => {
  if (user) {
    location.href = '/dashboard';
  } else {
    location.href = '/login'
  }
});
