const token = localStorage.getItem("token");
const apiUrl = "http://trungdeptry.uetbc.xyz";
// const apiUrl = "http://localhost:8888";
console.log(token)

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

async function putData(url, data = {}) {
    const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `${token}`
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // body data type must match "Content-Type" header
        body: JSON.stringify(data) // body data type must match "Content-Type" header

    });
    return response.json();
}

var queryString = window.location.search;
var searchParams = new URLSearchParams(queryString);
const orderCode = searchParams.get("orderCode");
const rendata = () => {
    getData(`${apiUrl}/admin/order/${orderCode}`).then(data => {
        console.log(data);
        const { reason } = data;
        const name = document.getElementById("fullName");
        name.innerHTML = reason.userInfo.name;
        const address = document.getElementById("address");
        address.innerHTML = reason.userInfo.address;
        const phone = document.getElementById("phone");
        phone.innerHTML = reason.userInfo.phone;
        const total = document.getElementById("total");
        total.innerHTML = `${reason.amount}$`;
        const bodyTable = document.getElementById("bodyoftable");
        bodyTable.innerHTML = "";
        reason.products.map(product => {
            const money = product.sellPrice * product.quantityOrder;
            const html = `
        <tr class="order_detail">
                  <td class="describe_product">
                    ${product.productName}
                    
                  </td>
                  <td class="price_product">
                    <span>${product.sellPrice}</span>
                  </td>
                  <td>${product.quantityOrder}</td>
                  <td class="price_total">
                    <div class="cl--primary" style="color: green">
                      ${money}$
                    </div>
                  </td>
                </tr>`
            bodyTable.innerHTML += html;
        })

        const selectBox = document.getElementById("stt");
        const options = selectBox.children;
        options[reason.status - 1].selected = true;
        console.log(options[reason.status - 1]);
    })
}
rendata()
const selectBox = document.getElementById("stt");
console.log(selectBox, "ddfdf")
// selectBox.addEventListener('change', () => {
//     const options = selectBox.children;
//     rendata();
//     for (var i = 0; i < options.length; i++) {
//         if (options[i].selected) {
//             console.log(options[i].value)
//             await putData(`${apiUrl}/admin/order/${orderCode}`, {
//                 status: options[i].value,
//                 orderCode
//             });
//             break;
//         }
//     }
// })
selectBox.onchange = () => {
    const options = selectBox.children;
    for (var i = 0; i < options.length; i++) {
        if (options[i].selected) {
            console.log(options[i].value)
            const data = {
                status: i + 1,
                orderCode
            }
            putData(`${apiUrl}/admin/order/${orderCode}`, data).then(() => console.log("oke"));
            break;
        }
    }
}