const displayGridBtn = document.getElementsByClassName('display--grid')[0];
const displayListBtn = document.getElementsByClassName('display--list')[0];
const displayGrid = document.getElementById('display--grid');
const displayList = document.getElementById('display--list');
let currentPage = 1;

async function getProduct() {
  const res = await fetch('http://localhost:3000/api/product');
  const product = await res.json();
  return product;
}

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
  currentPage = 1;
  displayGridSelect();
  renderPagination();
});

displayListBtn.addEventListener('click', () => {
  currentPage = 1;
  displayListSelect();
  renderPagination();
});

const products = [];

function addToCart(itemId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex((element) => element.id === itemId);
  const indexProduct = products.findIndex((element) => element.id === itemId);
  if (index === -1) {
    cart.push({ ...products[indexProduct], quantity: 1 });
  } else {
    cart[index].quantity++;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  const toastLiveExample = document.getElementById('liveToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
}

function renderGrid(list, page) {
  const domParser = new DOMParser();
  displayGrid.innerHTML = '';
  list.slice((page - 1) * 6, page * 6).forEach((element) => {
    const itemGrid = domParser.parseFromString(
      `
      <div class="bg-white rounded text-center p-2">
        <a href="/pages/detail/index.html?id=${element.id}">
          <div
            class="background--cover"
            style="background-image: url(${element.img})"
          ></div>
        </a>
        <hr />
        <p class="mt-3 mb-1 text-secondary fw-bold">HOME</p>
        <h5>${element.title}</h5>
        <p class="text--green fst-italic">
          ${element.price.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })}
          <span
            class="text-secondary"
            style="text-decoration: line-through"
            >${element.price.toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}</span
          >
        </p>
        <div
          class="d-flex justify-content-center align-items-center gap-3"
        >
          <button class="btn px-1 btn-outline-success fw-bold" onclick="addToCart(${
            element.id
          })">
            Mua hàng
          </button>
          <button class="btn btn-success">
            <i class="fas fa-heart"></i>
          </button>
          <button class="btn btn-outline-dark">
            <i class="fas fa-sync-alt"></i>
          </button>
        </div>
      </div>
    `,
      'text/html'
    );

    displayGrid.appendChild(itemGrid.body.firstChild);
  });
}

function renderList(list, page) {
  const domParser = new DOMParser();
  displayList.innerHTML = '';
  list.slice((page - 1) * 3, page * 3).forEach((element) => {
    const itemList = domParser.parseFromString(
      `
      <div class="row align-items-center">
        <div class="col-12 col-sm-4 col-lg-3 text-center">
          <a href="/pages/detail/index.html?id=${element.id}">
            <img
              src="${element.img}"
              alt="nuoc-hoa"
              class="img-fluid"
            />
          </a>
        </div>
        <div class="col-12 col-sm-8 col-lg-9">
          <h4>${element.title}</h4>
          <p>
            <i class="fas fa-heart"></i>
            <i class="fas fa-heart"></i>
            <i class="fas fa-heart"></i>
            <i class="fas fa-heart"></i>
            <i class="fas fa-heart"></i>
            <span class="ms-2 text-secondary">(4 lượt mua)</span>
          </p>
          <p class="text-secondary">
            Tự hào được ghi là năm mà Tiffani & Co là thành lập, bộ sưu
            tập mang tính biểu tượng này cung cấp cho một cái gật đầu
            với qua trong khi thể hiện một cảm giác hiện đại với kiểu
            dáng đẹp đường cong và đường nét mượt mà.
          </p>
          <p class="h3 fw-bolder fst-italic">${element.price.toLocaleString(
            'it-IT',
            {
              style: 'currency',
              currency: 'VND',
            }
          )}</p>
          <div class="d-flex align-items-center gap-3">
            <button class="btn px-1 btn-outline-success fw-bold" onclick="addToCart(${
              element.id
            })">
              Mua hàng
            <button class="btn btn-success">
              <i class="fas fa-heart"></i>
            </button>
            <button class="btn btn-outline-dark">
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>
      </div>
    `,
      'text/html'
    );

    displayList.appendChild(itemList.body.firstChild);
  });
}

getProduct().then((result) => {
  products.push(...result);
  renderGrid(products, currentPage);
  renderList(products, currentPage);
  renderPagination();
});

function updatePage(page) {
  document
    .getElementById(`page-${currentPage}`)
    .classList.remove('page--active');

  if (page < 1) currentPage = 1;
  else currentPage = page;

  if (localStorage.getItem('display') === 'grid') {
    if (page > Math.ceil(products.length / 6))
      currentPage = products.length / 6;
    renderGrid(products, currentPage);
  } else {
    if (page > Math.ceil(products.length / 3))
      currentPage = products.length / 3;
    renderList(products, currentPage);
  }

  document.getElementById(`page-${currentPage}`).classList.add('page--active');
}

function renderPagination() {
  const pagination = document.getElementById('pagination');

  pagination.innerHTML = `
    <li id="prev" onclick="${updatePage(currentPage - 1)}">
      <i class="list-pagination__item fas fa-caret-left px-2"></i>
    </li>
  `;

  const numberPerPage = localStorage.getItem('display') === 'grid' ? 6 : 3;

  [...Array(Math.ceil(products.length / numberPerPage))].forEach((_, index) => {
    pagination.insertAdjacentHTML(
      'beforeend',
      `<li id="page-${index + 1}" class="list-pagination__item ${
        index + 1 === currentPage ? 'page--active' : ''
      } fw-semibold px-2" onclick="updatePage(${index + 1})">${index + 1}</li>`
    );
  });

  pagination.insertAdjacentHTML(
    'beforeend',
    `<li id="next" class="list-pagination__item fw-semibold px-2">
      <i class="fas fa-caret-right"></i>
    </li>`
  );
}
