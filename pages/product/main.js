const displayGridBtn = document.getElementsByClassName('display--grid')[0];
const displayListBtn = document.getElementsByClassName('display--list')[0];
const displayGrid = document.getElementById('display--grid');
const displayList = document.getElementById('display--list');

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
  displayGridSelect();
});

displayListBtn.addEventListener('click', () => {
  displayListSelect();
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

getProduct().then((result) => {
  const domParser = new DOMParser();
  result.forEach((element) => {
    products.push(element);
    const itemGrid = domParser.parseFromString(
      `
      <div class="bg-white rounded text-center p-2">
        <div
          class="background--cover"
          style="background-image: url(${element.img})"
        ></div>
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

    const itemList = domParser.parseFromString(
      `
      <div class="row align-items-center">
        <div class="col-12 col-sm-4 col-lg-3 text-center">
          <img
            src="${element.img}"
            alt="nuoc-hoa"
            class="img-fluid"
          />
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

    displayGrid.appendChild(itemGrid.body.firstChild);
    displayList.appendChild(itemList.body.firstChild);
  });
});
