const toPage2Btn = document.getElementById('nav-page-2');
const toPage3Btn = document.getElementById('nav-page-3');
const toPage4Btn = document.getElementById('nav-page-4');

const label = document.getElementById('context');
const page2 = document.querySelector('.page-2');
const page3 = document.querySelector('.page-3');

toPage2Btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (page2.classList.contains('active')) {
    page2.classList.remove('active');
    label.innerHTML = "Getting Started";
  } else {
    page2.classList.add('active');
    label.innerHTML = "User Info";
  }
});

toPage3Btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (page3.classList.contains('active')) {
    page3.classList.remove('active');
    label.innerHTML = "User Info";
  } else {
    page3.classList.add('active');
    label.innerHTML = "Almost there";
  }
});
