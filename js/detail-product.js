
const apiUrl = "http://trungdeptry.uetbc.xyz";
// const apiUrl = "http://localhost:8888";

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
        title.innerHTML = productRawData.productName;

        const imgdiv = document.getElementsByClassName("img-showcase")[0];
        imgdiv.innerHTML = `<img src=${productRawData.image} alt="shoe image" />`;

        const desdiv = document.getElementsByClassName("product-detail")[0];
        desdiv.innerHTML += `<p>
        ${productRawData.textDescription}
      </p>`;

        const proLink = document.getElementsByClassName("product-link")[0];
        proLink.innerHTML = `Quantity in Stock: ${productRawData.quantityInStock}`


    })
}
renderData();


