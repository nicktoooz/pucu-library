import { getDatabase, onValue, ref } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
import app from '../../firebaseConfig.js';
const database = getDatabase(app);

let chart;
let inventoryChart;
const filter = document.getElementById('monthFilter');
const filterDate = ['2023-10-01', '2023-09-01', '2023-08-01', '2023-07-01'];
for (const date in filterDate) {
  const option = document.createElement('option');
  option.value = filterDate[date];
  option.textContent = `${new Date(filterDate[date]).toLocaleString('default', { month: 'long' })} ${new Date(filterDate[date]).getFullYear()}`;
  filter.appendChild(option);
}
const array = [['Task', 'Hours per Day'], ['Returned', 0], ['Returned Late', 0], ['Active Transactions', 0], ['Incoming Requests', 0], ['Active Overdue']];
const inventory = [
  ['Acquired Books', 0],
  ['Released Books', 0],
  ['Lost Books', 0],
];

//initial fetching 'all time'
fetchData('');
fetchInventoryStatus('');
filter.addEventListener('change', () => {
  fetchData(filter.value);
  fetchInventoryStatus(filter.value);
});

function fetchData(selectedDate) {
  const endDate = calculateEndDate(selectedDate);
  onValue(ref(database, `Borrowed Books`), (users) => {
    clearData();
    Object.keys(users.val()).forEach((user) => {
      onValue(ref(database, `Borrowed Books/${user}`), (transactions) => {
        const data = transactions.val();
        for (const content in data) {
          if (selectedDate == '' || isDateInRange(data[content]['Return Date'] || data[content]['Date Created'], selectedDate, endDate)) {
            if (data[content]['Status'] == 'returned' && data[content]['Late'] == false) {
              array[1][1]++;
            }
            if (data[content]['Status'] == 'returned' && data[content]['Late'] == true) {
              array[2][1]++;
            }
            if (data[content]['Status'] == 'active') {
              array[3][1]++;
            }
            if (data[content]['Status'] == 'pending') {
              array[4][1]++;
            }
            if (data[content]['Status'] == 'overdue') {
              array[5][1]++;
            }
          }
        }
        updateDoughnut();
      });
    });
  });
}

function fetchInventoryStatus(selectedDate) {
  const endDate = calculateEndDate(selectedDate);
  onValue(ref(database, `Books`), (snapshot) => {
    clearData();
    const books = snapshot.val();
    for (const index in books) {
      if (selectedDate == '' || isDateInRange(books[index]['Acquisition Date'], selectedDate, endDate)) {
        if (books[index]['Acquisition Date'] && !books[index]['Release Date'] && !books[index]['Lost']) {
          inventory[0][1]++;
        }
        if (books[index]['Release Date']) {
          inventory[1][1]++;
        }
        if (books[index]['Lost']) {
          inventory[2][1]++;
        }
      }
    }
    updateInventoryStatus();
  });
}

function clearData() {
  array[1][1] = 0;
  array[2][1] = 0;
  array[3][1] = 0;
  array[4][1] = 0;
  array[5][1] = 0;
  inventory[0][1] = 0;
  inventory[1][1] = 0;
  inventory[2][1] = 0;
}

function updateInventoryStatus() {
  const data = inventory.slice(0).map((item) => item[1]);
  const labels = inventory.slice(0).map((item) => item[0]);
  console.log(labels);

  document.getElementById('totalAcquired').textContent = inventory[0][1];
  document.getElementById('totalRelease').textContent = inventory[1][1];
  document.getElementById('totalLostBooks').textContent = inventory[2][1];

  if (inventoryChart) {
    inventoryChart.data.labels = labels;
    inventoryChart.data.datasets[0].data = data;
    inventoryChart.update();
  } else {
    const inventoryContainer = document.getElementById('inventory-canvas');
    inventoryChart = new Chart(inventoryContainer, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: ['blue', 'black', 'red'],
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            align: 'start',
            fullSize: true,
            labels: {
              color: 'black',
            },
          },
        },
      },
    });
  }
}
function updateDoughnut() {
  const data = array.slice(1).map((item) => item[1]);
  const labels = array.slice(1).map((item) => item[0]);

  document.getElementById('totalReturn').textContent = array[1][1];
  document.getElementById('totalLateReturn').textContent = array[2][1];
  document.getElementById('totalActiveTransactions').textContent = array[3][1];
  document.getElementById('totalIncomingRequests').textContent = array[4][1];
  document.getElementById('totalOverdue').textContent = array[5][1];

  if (chart) {
    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
  } else {
    //create doughnut
    const chartContainer = document.getElementById('doughnut');
    chart = new Chart(chartContainer, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: ['#1B5E20', '#E65100', '#FFFF00', 'blue', 'red'], // Set your desired colors
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'right',
            align: 'start',
            fullSize: true,
            labels: {
              color: 'black',
            },
          },
        },
      },
    });
  }
}

function calculateEndDate(startDate) {
  const date = new Date(startDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const lastDay = new Date(year, date.getMonth() + 1, 0).getDate();
  return `${year}-${month}-${lastDay}`;
}

function isDateInRange(dateToCheck, startDate, endDate) {
  const dateCheck = new Date(dateToCheck);
  const rangeStart = new Date(startDate);
  const rangeEnd = new Date(endDate);

  return dateCheck >= rangeStart && dateCheck <= rangeEnd;
}

function getFormattedDate(daysAgo = 0) {
  const today = new Date();
  today.setDate(today.getDate() - daysAgo);

  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
