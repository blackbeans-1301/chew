
// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
//     ready();
// }

//  Remove product from dbs


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
    })
        .catch(function (err) { console.log("req failed:" + err) });
    return response.json(); // parses JSON response into native JavaScript objects
}

// Add modal handler
const addProductModal = document.querySelector('.modal-add');
const confirmAddProductBtn = document.querySelector('.js-confirm-add-action');


function showAddProductModal() {
    addProductModal.classList.add('open');
}

function hideAddProductModal() {
    addProductModal.classList.remove('open');
}

const addAction = document.querySelector('.js-add-action');
const cancelAddAction = document.querySelector('.js-cancel-add-product');
addAction.addEventListener('click', showAddProductModal);
cancelAddAction.addEventListener('click', hideAddProductModal);
confirmAddProductBtn.addEventListener('click', function () {
    const productImg = document.getElementsByClassName('js-create-product-productImg')[0].value;
    // const prdimg = document.getElementById("imgImg").value;
    const productLine = document.getElementsByClassName('js-create-product-productLine')[0].value;
    const productName = document.getElementsByClassName('js-create-product-productName')[0].value;
    const description = document.getElementsByClassName('js-create-product-description')[0].value;
    const priceIn = document.getElementsByClassName('js-create-product-priceIn')[0].value;
    const priceOut = document.getElementsByClassName('js-create-product-priceOut')[0].value;
    const quantity = document.getElementsByClassName('js-create-product-quantity')[0].value;

    productData = {
        productImg,
        productLine,
        productName,
        description,
        priceIn,
        priceOut,
        quantity
    }

    console.log(productData);

    postData(`${apiUrl}/admin/product`, productData)
        .then(data => {
            console.log(data);
        })
        .catch(err => { console.log("then error: " + err); });
});


// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------



// console.log('click');
// console.log('clicked 236');

// // Edit modal handler
// const editProductModal = document.querySelector('.modal-edit');

// function showEditProductModal() {
//     editProductModal.classList.add('open');
// }

// function hideEditProductModal() {
//     editProductModal.classList.remove('open');
// }

// const cancelEditProductBtn = document.getElementsByClassName('js-cancel-edit-product');
// const editProductBtn = document.getElementsByClassName('js-edit-product-btn');

// for (var i = 0; i < editProductBtn.length; i++) {
//     var btn = editProductBtn[i];
//     btn.addEventListener('click', showEditProductModal);

// }
// editProductModal.addEventListener('click',showEditProductModal);
// cancelEditProductBtn.addEventListener('click',hideEditProductModal);