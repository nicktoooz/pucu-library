import { getDatabase, onValue, ref, set, update } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import app from '../../firebaseConfig.js';

const database = getDatabase(app);

const overlay = document.querySelector('.deleteOverlay');
const tooltip = document.querySelector('.tooltipOverlay');
document.getElementById('delete').addEventListener('click', () => {
  const book_id = document.getElementById('book-id').value;
  overlay.style.display = 'flex';
  const actionButtons = document.querySelector('.action-buttons');
  actionButtons.innerHTML = '';
  const releaseBtn = document.createElement('button');
  releaseBtn.setAttribute('id', 'releaseBtn');
  releaseBtn.textContent = 'Release';

  const lostBtn = document.createElement('button');
  lostBtn.setAttribute('id', 'lostBtn');
  lostBtn.textContent = 'Lost';

  actionButtons.appendChild(releaseBtn);
  actionButtons.appendChild(lostBtn);

  releaseBtn.addEventListener('click', () => {
    update(ref(database, `Books/${book_id}`), {
      'Release Date': getFormattedDate(0),
    });
    document.querySelector('.preview').style.flex = 0;
    overlay.style.display = 'none';
    tooltip.style.transform = 'translateX(0)';
    document.querySelector('.tooltipOverlay h1').textContent = 'Book released successfully';
    setTimeout(() => {
      tooltip.style.transform = 'translateX(100%)';
    }, 3000);
  });
  lostBtn.addEventListener('click', () => {
    update(ref(database, `Books/${book_id}`), {
      Lost: true,
      Available : false
    });
    document.querySelector('.preview').style.flex = 0;

    overlay.style.display = 'none';
    tooltip.style.transform = 'translateX(0)';
    document.querySelector('.tooltipOverlay h1').textContent = 'This book is lost';
    setTimeout(() => {
      tooltip.style.transform = 'translateX(100%)';
    }, 3000);
  });
});
document.getElementById('closeDelete').addEventListener('click', () => {
  overlay.style.display = 'none';
});

function getFormattedDate(daysAgo = 0) {
  const today = new Date();
  today.setDate(today.getDate() - daysAgo);
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
