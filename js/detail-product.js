const token = localStorage.getItem("token");
const apiUrl = "http://trungdeptry.uetbc.xyz";
// const apiUrl = "http://localhost:8888";

async function getData(url) {
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `${token}`
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer' // body data type must match "Content-Type" header
  });
  return response.json();
}

async function postD(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

var queryString = window.location.search;
var searchParams = new URLSearchParams(queryString);
const code = searchParams.get("code");

const renderData = () => {
  getData(`${apiUrl}/detailProduct/${code}`).then((data) => {
    console.log(data)
    const productRawData = data.reason;
    const spanPrice = document.getElementsByClassName("price")[0];
    spanPrice.innerHTML = productRawData.sellPrice + '$';

    const title = document.getElementsByClassName("product-title")[0];
    title.innerHTML = productRawData.productName + ", " + productRawData.productCode;

    const imgdiv = document.getElementsByClassName("img-showcase")[0];
    imgdiv.innerHTML = `<img class="origin-img" src=${productRawData.image} alt="shoe image" />`;

    const desdiv = document.getElementsByClassName("product-detail")[0];
    desdiv.innerHTML += `<p>
        ${productRawData.textDescription}
      </p>`;

    const proLink = document.getElementsByClassName("product-link")[0];
    proLink.innerHTML = `Quantity in Stock: ${productRawData.quantityInStock}`


  })
}
renderData();
getUserC();



// add to cart btn
var detail_addToCart = document.getElementById('js-AddToCartBtn');
detail_addToCart.addEventListener('click', function (event) {


  var button = event.target;
  var shopItem = button.parentElement.parentElement.parentElement;

  // get title of the product
  const title = document.getElementsByClassName("product-title")[0].innerText;

  //get product code
  var productCode = title.substring(title.search(', ') + 1);
  productCode = productCode.trim();
  // Get product image and store it to productImg var
  // var img = shopItem.getElementsByClassName('home-product-item__img')[0].style.backgroundImage;
  var imgSrc = shopItem.getElementsByClassName('origin-img')[0].src;
  // imgSrc = imgSrc.replaceAll('"', '');
  // Get product price
  var price = document.getElementsByClassName("price")[0].innerText;
  var quantity = document.getElementById('js-quantity').value;

  var parentElement = document.getElementsByClassName('header__cart-list-item')[0];


  // loop item through all product in cart: check if this product has in the cart
  if (!checkIfProductInC(productCode)) {

    parentElement.innerHTML += `<li class="header__cart-item">
    <img src="${imgSrc}" alt=""
      class="header__cart-img" />
    <div class="header__cart-item-info">
      <div class="header__cart-item-head">
        <h5 style="text-align: left" class="header__cart-item-name">
          ${title}
        </h5>
        <span class="header__cart-item-dolar">$</span>
        <span class="header__cart-item-price">${price}</span>
      </div>
      <div style="margin-top: 8px" class="header__cart-item-body">
        <div class="input-quantity-field">
          <span class="input-quantity-title" style="font-size: 1.4rem;">Số lượng</span>
          <input type="number" class="input-quantity-box" placeholder="SL" value="1">
        </div>
        <button class="header__cart-item-remove-item js-remove-item-btn">
          Xóa
        </button>
      </div>
    </div>
  </li>`;

    var data = {
      productCode,
      productName: title.replaceAll(`, ${productCode}`),
      image: imgSrc,
      quantity,
      sellPrice: price
    }

    console.log(data);
    console.log(token);

    postD(`${apiUrl}/cart`, data)
      .then(data => {
        console.log(data);
      }).catch(err => { console.log(err) })
    // console.log(parentElement.innerHTML);
    getUserC();
    addRemover();
    updateInputF();
    updateCartT();
    updateCartN();
  } else {
    alert('Product has in the cart');
  }

})

function getUserC() {
  getData(`${apiUrl}/cart`)
    .then(function (data) {

      var listProduct = data.reason;
      console.log(listProduct);
      var parentElement = document.getElementsByClassName('header__cart-list-item')[0];

      listProduct.forEach(function (product) {
        parentElement.innerHTML += `<li class="header__cart-item">
    <img src="${product.image}" alt=""
      class="header__cart-img" />
    <div class="header__cart-item-info">
      <div class="header__cart-item-head">
        <h5 style="text-align: left" class="header__cart-item-name">
          ${product.productName}, ${product.productCode}
        </h5>
        <span class="header__cart-item-dolar">$</span>
        <span class="header__cart-item-price">${product.sellPrice}</span>
      </div>
      <div style="margin-top: 8px" class="header__cart-item-body">
        <div class="input-quantity-field">
          <span class="input-quantity-title" style="font-size: 1.4rem;">Số lượng</span>
          <input type="number" class="input-quantity-box" placeholder="SL" value="${product.quantity}">
        </div>
        <button class="header__cart-item-remove-item js-remove-item-btn">
          Xóa
        </button>
      </div>
    </div>
  </li>`;
      })

      // ugetUserCart();
      addRemover();
      updateInputF();
      updateCartT();
      updateCartN();
    })
    .catch(function (err) { console.log("err when get user cart: " + err) });
}

function checkIfProductInC(productCode) {
  var check = false;
  const productElements = document.getElementsByClassName('header__cart-item-name');
  for (var i = 0; i < productElements.length; i++) {
    var title = productElements[i].innerText;
    var code = title.substring(title.search(', ') + 1);
    code = code.trim();
    if (productCode == code) {
      console.log(code, productCode);
      return true;
    }
  }
  return check;
}

function addRemover() {
  var removeCartItemBtns = document.getElementsByClassName('js-remove-item-btn');
  for (let i = 0; i < removeCartItemBtns.length; i++) {
    const rmBtn = removeCartItemBtns[i];
    rmBtn.addEventListener('click', function (event) {
      var buttonClicked = event.target;
      var title = buttonClicked.parentElement.parentElement.getElementsByClassName('header__cart-item-name')[0].innerText;
      var productCode = title.substring(title.search(', ') + 1);
      productCode = productCode.trim();
      deleteData(`${apiUrl}/cart`, { productCode: productCode })
        .then(function (data) {
          console.log(data);
        }).catch(function (err) {
          console.log(err);
        })

      buttonClicked.parentElement.parentElement.parentElement.remove();
      updateCartT();
      updateCartN();
    })
  }
}

function updateCartT() {
  // var cartItemContainer = document.getElementsByClassName('header__cart-list-item')[0];
  var cartRows = document.getElementsByClassName('header__cart-item');
  // console.log(cartItemContainer);
  var cartTotal = 0;

  for (let i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var headerCart = cartRow.getElementsByClassName('header__cart-item-info')[0].getElementsByClassName('header__cart-item-head')[0];
    var cartPriceElement = headerCart.getElementsByClassName('header__cart-item-price')[0];

    var bodyCart = cartRow.getElementsByClassName('header__cart-item-info')[0].getElementsByClassName('header__cart-item-body')[0];
    var quantityInputElement = cartRow.getElementsByClassName('input-quantity-field')[0].getElementsByClassName('input-quantity-box')[0];

    var price = parseFloat(cartPriceElement.innerText);
    var quantity = quantityInputElement.value;

    cartTotal += price * quantity;
  }
  // cartTotal = cartTotal.toFixed(1);
  document.getElementsByClassName('total-price-number')[0].innerText = `$${cartTotal}`;
}


function updateCartN() {
  const cartNotice = document.getElementsByClassName('header__cart-notice')[0];
  var noticeNumber = document.getElementsByClassName('header__cart-item').length;
  cartNotice.innerText = noticeNumber;
}

function updateInputF() {
  var inputFields = document.getElementsByClassName('input-quantity-box');

  for (let i = 0; i < inputFields.length; i++) {
    // var inputField = inputFields[i];
    inputFields[i].onchange = function () {
      inputFields[i].value = quantityMustPost(inputFields[i].value);
      console.log(inputFields[i].value);
      updateCartT();
    }
    // console.log(i);
  }
}


