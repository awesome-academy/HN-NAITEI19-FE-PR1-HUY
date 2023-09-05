const displayGridBtn = document.getElementsByClassName('display--grid')[0];
const displayListBtn = document.getElementsByClassName('display--list')[0];
const displayGrid = document.getElementById('display--grid');
const displayList = document.getElementById('display--list');

function displayGridSelect() {
  displayGridBtn.classList.add('active');
  displayListBtn.classList.remove('active');

  localStorage.setItem('display', 'grid');
  displayGrid.style.setProperty('display', 'grid', 'important');
  displayList.style.setProperty('display', 'none', 'important');
}

function displayListSelect() {
  displayGridBtn.classList.remove('active');
  displayListBtn.classList.add('active');

  localStorage.setItem('display', 'list');
  displayGrid.style.setProperty('display', 'none', 'important');
  displayList.style.setProperty('display', 'flex', 'important');
}

if (localStorage.getItem('display') === 'list') {
  displayListSelect();
} else {
  displayGridSelect();
}

displayGridBtn.addEventListener('click', () => {
  displayGridSelect();
});

displayListBtn.addEventListener('click', () => {
  displayListSelect();
});
