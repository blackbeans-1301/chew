// console.log("clicked")
const token = localStorage.getItem("token");
const apiUrl = "http://trungdeptry.uetbc.xyz";
// const apiUrl = "http://localhost:8888";


// delete data fetch
async function deleteData(url = '', token, data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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


// get data function
async function getData(url, token = "") {
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

async function postData(url = '', data = {}) {
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




//  get all product
const getAllProduct = function () {
    getData(`${apiUrl}/allProduct?search=&sort=`)
        .then(data => {
            // console.log(typeof data); // JSON data parsed by `data.json()` call
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
                        <button class="home-product-item__add btn js-remove-product">Xóa</button>
                    </div>
                </div>
            </div>
`
                productContent += data + '<br>';
            }

            productRawData.forEach(toPrettyData);

            // console.log(productRawData); // JSON data parsed by `data.json()` call
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
        button.addEventListener('click', function (event) {
            // RmBtn.addEventListener('click', removeProduct(code));
            var btnClicked = event.target;
            var title = btnClicked.parentElement.parentElement.getElementsByClassName('home-product-item__name')[0].innerText;
            var code = title.substring(title.search(', ') + 1);
            code = code.trim();
            removeProduct(code);
            // document.location.reload(true);
            setTimeout(function () {
                document.location.reload(true);
            }, 500)
        })
    }
}, 500);


// delete product by admin page
const removeProduct = function (productCode) {
    var data = {
        productCode
    }
    console.log(data, token);
    deleteData(`${apiUrl}/admin/product`, token, data)
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` 
        });
}


const getOrder = async () => {
    await getData(`${apiUrl}/admin/orders`, token).then(data => {
        const results = data.reason;
        let innerHTML = "";
        console.log(results)
        results.map(result => {
            let status = ""
            if (result.status == 1) status = "Dang chuan bi";
            else if (result.status == 2) status = "Da hoan tat";
            else status = "Da huy"
            let row = `<tr class="order_detail">
        <td class="describe_product">
            ${result.fullName}
        </td>
        <td class="price_product">
            <span>${result.phone}</span>
        </td>
        <td>
            ${result.address}
        </td>
        <td class="price_product">
            <span>${result.orderDate}</span>
        </td>
        <td class="price_total">
            <div class="cl--primary" style="color:#ffe11b">Không</div>
        </td>
        <td class="price_product">
            <span>${status}</span>
        </td>
        
        <td class="recycle">
            <a href="/orderDetail.html?orderCode=${result.orderCode}">
                <button class="btn btn-secondary" type="button">
                    <i class="ti-pencil-alt" style="color:lime"></i><span style="color:lime"> Chi tiết</span>
                </button>
            </a>
        </td>
    </tr>`;
            innerHTML += row;
        });
        const tbody = document.getElementById("tbody");
        console.log(tbody)
        tbody.innerHTML = innerHTML;
    }).catch(err => console.log(err))
}

const allOrder = document.getElementById("allOrder");
allOrder.addEventListener('click', () => {
    allProduct.classList.add("no_display");
    tableOrder.classList.remove("no_display");
    getOrder();
});

const tatcasp = document.getElementById("tatcasp");
tatcasp.addEventListener('click', () => {
    allProduct.classList.remove("no_display");
    tableOrder.classList.add("no_display")
})

const allProduct = document.getElementsByClassName("all-product")[0];
const tableOrder = document.getElementsByClassName("table_order")[0];


