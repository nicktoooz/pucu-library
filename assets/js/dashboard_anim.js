const sidebar_collapse = document.querySelector('.sidebar-content-collapse');
const sidebar_extend = document.querySelector('.sidebar-content-extend');
const sidebar = document.querySelector('.sidebar');
const menu = document.getElementById('menu_btn');
menu.src = 'images/dashboard-images/menu.svg';
menu.addEventListener('click', () => {
  if (sidebar.classList.contains('extend')) {
    sidebar.classList.replace('extend', 'collapse');
    sidebar_collapse.classList.replace('hide', 'show');
    sidebar_extend.classList.replace('show', 'hide');
    menu.src = 'images/dashboard-images/menu.svg';
  } else {
    sidebar.classList.replace('collapse', 'extend');
    sidebar_collapse.classList.replace('show', 'hide');
    sidebar_extend.classList.replace('hide', 'show');
    menu.src = 'images/dashboard-images/menu-extend.svg';
  }
});

const highlights = document.querySelector('.highlights');
const highlight_trigger = document.getElementById('highlights_trigger');
highlight_trigger.addEventListener('click', () => {
  if (highlights.classList.contains('extend')) {
    highlights.classList.replace('extend', 'collapse');
  } else {
    highlights.classList.replace('collapse', 'extend');
  }
});


