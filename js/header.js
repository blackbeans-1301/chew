const extraInfo = document.getElementById("extraInfo");
const userName = localStorage.getItem("userName");
console.log({ userName })
console.log(extraInfo)
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
