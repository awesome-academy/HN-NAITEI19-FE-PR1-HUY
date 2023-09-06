function changeImage(element) {
  var main_prodcut_image = document.getElementById('main-image');
  main_prodcut_image.src = element.src;
}

function showToast() {
  const toastLiveExample = document.getElementById('liveToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
}

async function getProduct(id) {
  const res = await fetch('http://localhost:3000/api/product/' + id);
  const product = await res.json();
  return product;
}

const searchParam = new URLSearchParams(window.location.search);
const itemId = parseInt(searchParam.get('id'));

var item;

getProduct(itemId)
  .then((result) => {
    item = result;
    console.log('Call api get a product successfully');
    document.getElementById('main-image').src = result.img;
    document.getElementById('prod-title').innerText = result.title;
    document.getElementById('prod-price').innerText =
      result.price.toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
      });
    document.getElementById('prod-desc').innerText = result.description;
  })
  .catch((error) => {
    console.log('Lỗi rồi bé ơi :((((', error);
  });

function addToCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex((element) => element.id === itemId);
  if (index === -1) {
    cart.push({ ...item, quantity: 1 });
  } else {
    cart[index].quantity++;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  const toastLiveExample = document.getElementById('liveToast');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();
}
