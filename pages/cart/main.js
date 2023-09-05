const cart = JSON.parse(localStorage.getItem('cart')) || [];
const domParser = new DOMParser();

const tbody = document.getElementById('data');

function showIconEmpty() {
  document.getElementById('data').innerHTML = '';

  if (document.getElementById('cart-empty')) return;

  const emptyCart = domParser.parseFromString(
    `<div id="cart-empty" class="w-25">
      <img
        src="https://bizweb.dktcdn.net/100/333/755/themes/688335/assets/empty_cart.png?1647314197820"
        class="img-fluid"
      />
    </div>`,
    'text/html'
  ).body.firstChild;

  document.getElementById('cart').appendChild(emptyCart);
}

function deleteCart() {
  showIconEmpty();

  cart.splice(0, cart.length);
}

function inputOnChange(value, index) {
  cart[index].quantity = value;
  document.getElementById(`total-${index}`).innerText = (
    cart[index].price * cart[index].quantity
  ).toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });
}

if (cart.length === 0) {
  showIconEmpty();
} else {
  cart.forEach((element, index) => {
    tbody.insertAdjacentHTML(
      'beforeend',
      `
    <tr id="item-${element.id}">
      <th scope="row">
        <img
          src="${element.img}"
          alt="${`san-phan-${element.id}`}"
          class="img-fluid"
        />
      </th>
      <td>${element.title}</td>
      <td class="fw-bold">${element.price.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
      })}</td>
      <td>
        <div class="form-outline d-flex justify-content-center">
          <input
            value="${element.quantity}"
            min="1"
            type="number"
            id="typeNumber"
            class="form-control item"
            style="width: 65px"
            onchange="inputOnChange(this.value, ${index})"
          />
        </div>
      </td>
      <td id="total-${index}" class="fw-bold">${(
        element.price * element.quantity
      ).toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
      })}</td>
      <td><button class="btn bg-white" onclick="deleteItem(${
        element.id
      })"><i class="fas fa-trash-alt"></i></button></td>
    </tr>
    `
    );
  });
}

function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  const toastLiveExample = document.getElementById('liveToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
}

function deleteItem(itemId) {
  const index = cart.indexOf((element) => element.id === itemId);
  document.getElementById(`item-${itemId}`).remove();

  cart.splice(index, 1);

  if (cart.length === 0) {
    showIconEmpty();
  }
}
