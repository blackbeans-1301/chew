const apiUrl = "http://localhost:8888"
const extraInfo = document.getElementById("extraInfo");
const userName = localStorage.getItem("userName");
const token = localStorage.getItem("token");
console.log({ userName })
console.log(extraInfo)
async function callApi(url = apiUrl, token = "", method = "GET") {
	const response = await fetch(url, {
		method: `${method}`, // *GET, POST, PUT, DELETE, etc.
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

const ren = () => {
	if (userName) {
		extraInfo.innerHTML = `<li class="header__navbar-item">
    <a href="#" class="header__navbar-link">
      <i class="fa-solid fa-bell"></i>
      Thông báo
    </a>
  </li>

  <li class="header__navbar-item">
    <a href="#" class="header__navbar-link">
      Trợ giúp
      <i class="fa-solid fa-circle-question"></i>
    </a>
  </li>
  <li class="header__navbar-item header__navbar-user-info">
                            <img src="https://cf.shopee.vn/file/c8bc22da9445e5b9bfdf1b35ff7dedd3_tn" alt=""
                                class="header__navbar-user-avatar">
                            <span class="header__navbar-user-name">${userName}</span>
                            <ul class="header__navbar-user-menu">
                                <li class="header__navbar-user-menu-item">
                                    <a href="">Tài khoản</a>
                                </li>

                                <li class="header__navbar-user-menu-item">
                                    <a href="">Đơn mua</a>
                                </li>

                                <li class="header__navbar-user-menu-item logout-button">
                                    <a href="">Đăng xuất</a>
                                </li>
                            </ul>
                        </li>
  `
	}
	else {
		extraInfo.innerHTML = `
     <li class="header__navbar-item">
    <a href="#" class="header__navbar-link">
      <i class="fa-solid fa-bell"></i>
      Thông báo
    </a>
  </li>

  <li class="header__navbar-item">
    <a href="#" class="header__navbar-link">
      Trợ giúp
      <i class="fa-solid fa-circle-question"></i>
    </a>
  </li>
     <li
     class="header__navbar-item header__navbar-item--bold header__navbar-item--separate js-sign-up"
   >
     Đăng ký
   </li>
   <li
     class="header__navbar-item header__navbar-item--bold js-sign-in"
   >
     Đăng nhập
   </li>`
	}
}
ren();
const buttonLogout = document.getElementsByClassName("logout-button")[0];
buttonLogout.addEventListener('click', () => window.localStorage.clear())


const renCart = async () => {
	await callApi(`${apiUrl}/cart`, token).then(result => {
		console.log(result);
	}).catch(err => console.log(err))
}
renCart();