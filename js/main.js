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


const signUp = function () {
    const userName = document.getElementById("this-userName").value;
    const password = document.getElementById("this-password").value;
    const passwordRp = document.getElementById("this-passwordRp").value;
    const fullName = document.getElementById("this-fullName").value;
    const phone = document.getElementById("this-phone").value;


    const checkRepeatPassword = function () {
        return password == passwordRp;
    }

    if (checkRepeatPassword()) {
        userInfo = {
            userName,
            password,
            fullName,
            phone
        }
        postData(`${apiUrl}/signup`, userInfo)
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
    }
}

const signIn = function () {
    const userName = document.getElementById("sign-in-username").value;
    const password = document.getElementById("sign-in-password").value;

    userInfo = {
        userName,
        password
    }

    console.log(userInfo);
    postData(`${apiUrl}/signin`, userInfo)
        .then(data => {
            console.log("data result:")
            console.log(data); // JSON data parsed by `data.json()` call
        });

}

// const btnSignup = document.querySelector('.js-signup-btn');
// btnSignup.addEventListener('click', signUp);



const getAllProduct = function () {
    getData(`${apiUrl}/allProduct`)
        .then(data => {
            console.log(typeof data); // JSON data parsed by `data.json()` call
            const productList = document.getElementById("product-list");
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
                        ${productName}, ${productCode}
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
                        <button class="home-product-item__add btn">Add to cart</button>
                    </div>
                </div>
            
            </div>`
                productContent += data + '<br>';
            }

            productRawData.forEach(toPrettyData);

            console.log(productRawData); // JSON data parsed by `data.json()` call
            // productList.appendChild(productContent);
            productList.innerHTML = productContent;

        }).catch(err => console.log(err));
}

const getProductLine = function (categoryName) {
    return function () {
        getData(`${apiUrl}/listProduct/${categoryName}`)
            .then(data => {

                const productList = document.getElementById("product-list");
                var productContent = '';

                function getRawData() {
                    const arrayData = data.reason;
                    const objectData = arrayData[0];
                    return objectData.product;
                }

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
                            ${productName}, ${productCode}
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
                            <button class="home-product-item__add btn">Add to cart</button>
                        </div>
                    </div>
                
                </div>`
                    productContent += data + '<br>';
                }

                const productRawData = getRawData();

                productRawData.forEach(toPrettyData);

                console.log(productRawData); // JSON data parsed by `data.json()` call
                // productList.appendChild(productContent);
                productList.innerHTML = productContent;

            }).catch(err => console.log(err));
    }
};

const lineAllProduct = document.querySelector('.js-category__all-product');
const lineDogPA = document.querySelector('.js-category__dog-pa');
const lineCatPA = document.querySelector('.js-category__cat-pa');
const lineDogKanel = document.querySelector('.js-category__dog-kanel');
const lineCatKanel = document.querySelector('.js-category__cat-kanel');
const lineCatMilk = document.querySelector('.js-category__cat-milk');


getAllProduct();
const btnSignin = document.querySelector('.js-signin-btn');
btnSignin.addEventListener('click', signIn);

lineDogPA.addEventListener('click', getProductLine('DOG_PA'));
lineCatPA.addEventListener('click', getProductLine('CAT_PA'));
lineDogKanel.addEventListener('click', getProductLine('DOG_KANEL'));
lineCatKanel.addEventListener('click', getProductLine('CAT_KANEL'));
lineCatMilk.addEventListener('click', getProductLine('CAT_MILK'));