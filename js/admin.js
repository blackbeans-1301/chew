// console.log("clicked")

const apiUrl = "http://localhost:8888";

async function getData(url) {
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // body data type must match "Content-Type" header
    });
    return response.json();
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
const getAllProduct = function () {
    getData(`${apiUrl}/allProduct`)
        .then(data => {
            console.log(typeof data); // JSON data parsed by `data.json()` call
            const productList = document.getElementById("main-product-list");
            const productNumber = document.getElementById("js-product-number");
            // const results = data.reason;

            var productContent = '';
            const productRawData = data.reason;

            function toPrettyData(value) {
                const price = value.sellPrice;
                const imgUrl = value.image;
                const productName = value.productName;
                const quantity = value.quantityInStock;
                const productCode = value.productCode;

                var data = `<div class="grid__col-2-4">
                <div class="home-product-item">
                    <div class="home-product-item__img"
                        style="background-image: url(${imgUrl});">
                    </div>
                    <h4 class="home-product-item__name">
                        ${productName}
                    </h4>


                    <div class="home-product-item__price">
                        <span class="home-product-item__price-icon">$</span>
                        <span class="home-product-item__price-number">${price}</span>
                    </div>

                    <div class="home-product-item__quantity">
                        <span id="quantity-title">Số lượng: </span>
                        <span id="js-quantity-in-stock">${quantity}</span>
                    </div>
                    <div class="home-product-item__add-to-card">
                        <button class="home-product-item__add btn js-remove-product">Xóa</button>
                    </div>
                </div>
            </div>
`
                productContent += data + '<br>';
            }

            productRawData.forEach(toPrettyData);

            console.log(productRawData); // JSON data parsed by `data.json()` call
            // productList.appendChild(productContent);
            productList.innerHTML = productContent;
            productNumber.innerHTML = `<span class="product-list-header__title-text">${productRawData.length} Sản phẩm</span>`

        }).catch(err => console.log(err));
}

getAllProduct();
const editProductBtn = document.querySelector('data-product')


// Remove product from database

setTimeout(function () {
    var removeProductBtn = document.getElementsByClassName('js-remove-product');
    for (var i = 0; i < removeProductBtn.length; i++) {
        var button = removeProductBtn[i];
        button.addEventListener('click', function () {
            console.log('clicked');
        })
    }
}, 2000);

// function removeProduct
function removeProduct(id) {
    
}
