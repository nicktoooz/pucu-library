import { getDatabase, onValue, ref, set, push } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import app from '../../firebaseConfig.js';

let borrowerCount = 0;
let overdueCount = 0;
let chart;
const database = getDatabase(app);

onValue(ref(database, 'User Info/Borrowers'), (snapshot) => {
  document.getElementById('borrowers').textContent = Object.keys(snapshot.val()).length;
});

onValue(ref(database, 'Borrowed Books'), (_users) => {
  borrowerCount = 0;
  overdueCount = 0;
  Object.keys(_users.val()).forEach((users) => {
    onValue(ref(database, `Borrowed Books/${users}`), (_transactions) => {
      Object.keys(_transactions.val()).forEach((transaction) => {
        onValue(ref(database, `Borrowed Books/${users}/${transaction}`), (e) => {
          if (e.val()['Status'] == 'active') {
            document.getElementById('issued').textContent = ++borrowerCount;
          }
          if (e.val()['Status'] == 'overdue') {
            document.getElementById('overdue').textContent = ++overdueCount;
          }
        });
      });
    });
  });
});
const array = [
  ['Day', 'Issued Books', 'Visitors'],
  [getFormattedDate(6), 0, 0],
  [getFormattedDate(5), 0, 0],
  [getFormattedDate(4), 0, 0],
  [getFormattedDate(3), 0, 0],
  [getFormattedDate(2), 0, 0],
  [getFormattedDate(1), 0, 0],
  [getFormattedDate(0), 0, 0],
];
update();

function getFormattedDate(daysAgo = 0) {
  const today = new Date();
  today.setDate(today.getDate() - daysAgo);

  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
console.log(getFormattedDate());

onValue(ref(database, `Visitors`), (snapshot) => {
  Object.keys(snapshot.val()).forEach((key) => {
    onValue(ref(database, `Visitors/${key}`), (data) => {
      for (const info in data.val()) {
        const date = data.val()[info]['Date'];
        if (date === getFormattedDate(0)) {
          array[7][2]++;
        }
        if (date === getFormattedDate(1)) {
          array[6][2]++;
        }
        if (date === getFormattedDate(2)) {
          array[5][2]++;
        }
        if (date === getFormattedDate(3)) {
          array[4][2]++;
        }
        if (date === getFormattedDate(4)) {
          array[3][2]++;
        }
        if (date === getFormattedDate(5)) {
          array[2][2]++;
        }
        console.log(array);
        update();
      }
    });
  });
});

function update() {
  document.getElementById('visitors').textContent = array[7][2];
  const label = array.slice(1).map((item) => item[0]);
  const visitor = array.slice(1).map((item) => item[2]);

  if (chart) {
    chart.data.labels = label;
    chart.data.datasets[0].data = visitor;
    chart.update();
  } else {
    const container = document.querySelector('#curve_chart');
    chart = new Chart(container, {
      type: 'bar',
      data: {
        labels: label,
        datasets: [
          {
            label: 'Visitors',
            data: visitor,
            backgroundColor: 'green',
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: true,
      },
    });
  }
}


