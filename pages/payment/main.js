const cart = JSON.parse(localStorage.getItem('cart')) || [];
const card = document.getElementById('list-item');
const invoice = JSON.parse(localStorage.getItem('invoice'));

cart.forEach((element) => {
  card.insertAdjacentHTML(
    'beforeend',
    `<div class="row align-items-center">
      <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
        <div
          class="bg-image hover-overlay hover-zoom ripple rounded"
          data-mdb-ripple-color="light"
        >
          <img
            src="${element.img}"
            class="w-100"
            alt="Blue Jeans Jacket"
          />
        </div>
      </div>

      <div class="col-lg-9 col-md-6 mb-4 mb-lg-0">
        <h5><strong>${element.title}</strong></h5>
        <p><strong>Giá:</strong> ${element.price.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })}</p>
        <p><strong>Số lượng:</strong> ${element.quantity}</p>
        <hr class="w-25" />
        <h5><strong>Tổng: </strong> ${(
          element.price * element.quantity
        ).toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        })}</h5>
      </div>
    </div>`
  );

  card.insertAdjacentHTML('beforeend', `<hr class="my-4" />`);
});

const totalTag = document.getElementById('total');
if (totalTag) {
  totalTag.innerText = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    });
}

if (invoice) {
  document.getElementById('cardOwner').innerText = invoice.cardOwner;
  document.getElementById('cardNumber').innerText = invoice.cardNumber;
  document.getElementById('invoiceTotal').innerText = cart
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toLocaleString('it-IT', {
      style: 'currency',
      currency: 'VND',
    });
}

const invoiceTag = document.getElementById('invoice');
if (invoiceTag) {
  invoiceTag.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {};
    for (const [name, value] of formData) {
      data[name] = value;
    }

    localStorage.setItem('invoice', JSON.stringify(data));

    window.location.href = '/pages/payment/confirm.html';
  });
}

function confirmInvoice() {
  const data = {
    customerName: invoice.cardOwner,
    total: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    itemsList: cart.map((item) => ({
      itemId: item.id,
      quantity: parseInt(item.quantity),
    })),
  };

  fetch('http://localhost:3000/api/order', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  localStorage.removeItem('invoice');
  localStorage.removeItem('cart');
  window.location.href = '/pages/payment/success.html';
}
