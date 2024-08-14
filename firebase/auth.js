import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js';
import { ref, set, getDatabase } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import app from '../firebase/firebaseConfig.js';
const auth = getAuth(app);

// HTML elements
const credentialsForm = document.getElementById('credentials-form');
const userInfoForm = document.getElementById('user-info-form');
const workDetailsForm = document.getElementById('work-details');
const contextLabel = document.getElementById('context');

document.getElementById('nav-page-4').addEventListener('click', async () => {
  const email = credentialsForm.querySelector('#email').value;
  const password = credentialsForm.querySelector('#password').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Capture user information from page 2 and page 3 forms
    const firstname = userInfoForm.querySelector('#firstname').value;
    const lastname = userInfoForm.querySelector('#lastname').value;
    const birthdate = userInfoForm.querySelector('#birthdate').value;
    const gender = userInfoForm.querySelector('#gender').value;
    const phone = userInfoForm.querySelector('#phone').value;
    const middlename = userInfoForm.querySelector('#middlename').value;
    const facultyID = workDetailsForm.querySelector('#facultyID').value;
    const timeIn = workDetailsForm.querySelector('#timeIn').value;
    const timeOut = workDetailsForm.querySelector('#timeOut').value;
    const schedule = workDetailsForm.querySelector('#schedule').value;

      // Store user information in the database
      const database = getDatabase(app)
    const userRef = ref(database, `User Info/Staff/${user.uid}`);
    const userData = {
      firstname,
      lastname,
      birthdate,
      gender,
      middlename,
      phone,
      facultyID,
      timeIn,
      timeOut,
      schedule,
    };

    await set(userRef, userData);

    // Redirect to the dashboard.html page upon successful signup
    window.location.href = '/dashboard.html';
  } catch (error) {
    console.error(error);
    // Handle signup errors (e.g., display error messages)
  }
});
