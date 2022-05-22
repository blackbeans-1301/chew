
// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', ready)
// } else {
//     ready();
// }

//  Remove product from dbs


// Add modal handler
const addProductModal = document.querySelector('.modal-add');
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