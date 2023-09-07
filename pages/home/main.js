let products = [];

async function getProduct() {
  const res = await fetch('http://localhost:3000/api/product');
  const product = await res.json();
  return product;
}

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
  products = [...result];

  result.splice(0, 6).forEach((element, index) => {
    document.getElementById('carousel-indicators').insertAdjacentHTML(
      'beforeend',
      `
      <button
        type="button"
        data-bs-target="#carousel"
        data-bs-slide-to="${index}"
        class="active"
        aria-current="true"
        aria-label="Slide ${index + 1}"
      ></button>
    `
    );

    document.getElementById('carousel-inner').insertAdjacentHTML(
      'beforeend',
      `
      <div class="carousel-item ${index === 0 ? 'active' : ''}">
        <div
          class="d-flex justify-content-center gap-5 align-items-center"
        >
          <div class="bg-white rounded text-center p-4">
            <a href="/pages/detail/index.html?id=${element.id}">
              <img src="${element.img}" alt="my-pham1" class="img-fluid" />
            </a>
            <hr />
            <p class="mt-3 mb-1 text-secondary fw-bold">HOME</p>
            <h5>${element.title}</h5>
            <p class="text--green fst-italic">
              ${element.price}
              <span
                class="text-secondary"
                style="text-decoration: line-through"
                >450.000đ</span
              >
            </p>
            <div class="row">
              <div class="col-6">
                <button class="btn btn-outline-success fw-bold" onclick="addToCart(${
                  element.id
                })">
                  Mua hàng
                </button>
              </div>
              <div class="col-3">
                <button class="btn btn-success">
                  <i class="fas fa-heart"></i>
                </button>
              </div>
              <div class="col-3">
                <button class="btn btn-outline-dark">
                  <i class="fas fa-sync-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
    );
  });
});
