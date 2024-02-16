// loading

const loading = document.getElementById("loading");

const loadingDuration = 6500; // 6.5s

setTimeout(() => {
  loading.classList.add("loading-none");
}, loadingDuration);

// loading new version

// const loading = document.getElementById("loading");

// window.addEventListener("load", () => {
//   document.querySelector("#loading").classList.add("loading-none")
// })

// backtop
window.addEventListener("scroll", () => {
  if (scrollY >= 200) {
    document.querySelector("#backtop").classList.add("backtop-show");
  } else {
    document.querySelector("#backtop").classList.remove("backtop-show");
  }
});

// mode btn

let modeBtn = document.getElementById("mode-btn");

modeBtn.addEventListener("click", function () {
  if (document.body.className != "dark") {
    this.firstElementChild.src = "../assets/images/light.svg";
  } else {
    this.firstElementChild.src = "../assets/images/dark.svg";
  }
  document.body.classList.toggle("dark");
});

// dropdown start

const dropdownMenu = document.querySelector(".nav__left__icon");
const dropdown = document.querySelector(".dropdown");
const dropdownHave = document.querySelector(".dropdown-have");
const footerDropMenu = document.querySelector(".footer__nav__center__card");

dropdownMenu.addEventListener("click", () => {
  dropdown.classList.toggle("dropdown-have");
});

footerDropMenu.addEventListener("click", () => {
  dropdown.classList.toggle("dropdown-have");
});

const dropdownInfo = document.querySelector(".dropdown__info");

function getDropdownItems({ name }) {
  const dropdownList = document.createElement("ul");
  dropdownList.className = "dropdown__list";
  const dropdownItem = document.createElement("li");
  dropdownItem.className = "dropdown__item";
  const dropdownLink = document.createElement("a");
  dropdownLink.className = "dropdown__link";
  dropdownLink.href = "./categories.html";

  dropdownLink.textContent = name;

  dropdownItem.appendChild(dropdownLink);
  dropdownList.appendChild(dropdownItem);

  return dropdownList;
}

const dropdownNice = categories.forEach((el) => {
  dropdownInfo.append(getDropdownItems(el));
});

// start

const actionFirstSection = document.querySelector("#action__first");
const actionBoxFirst = document.querySelector(".action__box__first");
const searchInput = document.querySelector(".nav__left__input");
const pagination = document.querySelector(".pagination");
const priceSortSelect = document.querySelector(".price-sort");

// cart start
const cartQuantity = document.querySelector(".cart-quantity");
const cartQuantityMobile = document.querySelector(".cart-quantity-mobile");

let cartJson = localStorage.getItem("cart");

let cartQuantityProducts = JSON.parse(cartJson) || [];

function getCardQuantity() {
  cartQuantity.textContent = cartQuantityProducts.length;
  cartQuantityMobile.textContent = cartQuantityProducts.length;
}

getCardQuantity();
// end

let search = "";

let activePage = +localStorage.getItem(PAGE) || 1;

let priceSort = "initial";

function getProducts() {
  let results = products.filter((pr) => pr.name.toLowerCase().includes(search));

  let sortResults;

  if (priceSort === "asc") {
    sortResults = results.toSorted((a, b) => a.price - b.price);
  } else if (priceSort === "desc") {
    sortResults = results.toSorted((a, b) => b.price - a.price);
  } else {
    sortResults = results;
  }

  let pages = Math.ceil(results.length / LIMIT);

  if (pages > 1) {
    pagination.innerHTML = `<li class="page-item">
      <button onclick="getPage('-')" class="page-link ${
        activePage === 1 ? "active" : ""
      }" ${activePage === 1 ? "disabled" : ""}>&laquo;</button>
    </li>`;

    for (let i = 1; i <= pages; i++) {
      pagination.innerHTML += `<li class="page-item"><button class="page-link ${
        i === activePage ? "active" : ""
      }" onclick="getPage(${i})">${i}</button></li>`;
    }

    pagination.innerHTML += `<li class="page-item">
      <button onclick="getPage('+')" class="page-link ${
        activePage === pages ? "active" : ""
      }" ${activePage === pages ? "disabled" : ""}>&raquo;</button>
    </li>`;
  } else {
    pagination.innerHTML = "";
  }

  actionBoxFirst.innerHTML = "";

  let start = (activePage - 1) * LIMIT;
  let end = activePage * LIMIT;

  sortResults.slice(start, end).map((product) => {
    actionBoxFirst.innerHTML += getProductsCard(product, "all");
  });
}

function getPage(page) {
  if (page === "+") {
    activePage++;
  } else if (page === "-") {
    activePage--;
  } else {
    activePage = page;
  }
  localStorage.setItem(PAGE, activePage);
  getProducts();
}

getProducts();

searchInput.addEventListener("keyup", function () {
  search = this.value.trim().toLowerCase();
  activePage = 1;
  getProducts();
});

priceSortSelect.addEventListener("change", function () {
  priceSort = this.value;
  getProducts();
});

// cart start
function addToCart(id) {
  let productFound = products.find((pr) => pr.id === id);
  let productsInCart = cartQuantityProducts.find((pr) => pr.id === id);

  if (productsInCart) {
    cartQuantityProducts = cartQuantityProducts.map((pr) => {
      if (pr.id === id) {
        pr.quantity++;
      }
      return pr;
    });
  } else {
    productFound.quantity = 1;
    cartQuantityProducts.push(productFound);
  }

  getCardQuantity();
  getProducts();

  localStorage.setItem("cart", JSON.stringify(cartQuantityProducts));
}

function increaseQuantity(id) {
  cartQuantityProducts = cartQuantityProducts.map((pr) => {
    if (pr.id === id) {
      pr.quantity++;
    }
    return pr;
  });
  getCardQuantity();
  getProducts();
  localStorage.setItem("cart", JSON.stringify(cartQuantityProducts));
}

function decreaseQuantity(id) {
  let productInCart = cartQuantityProducts.find((pr) => pr.id === id);
  if (productInCart.quantity === 1) {
    cartQuantityProducts = cartQuantityProducts.filter((pr) => pr.id !== id);
  } else {
    cartQuantityProducts = cartQuantityProducts.map((pr) => {
      if (pr.id === id) {
        pr.quantity--;
      }
      return pr;
    });
  }

  getCardQuantity();
  getProducts();
  localStorage.setItem("cart", JSON.stringify(cartQuantityProducts));
}
// cart end

// user
var input = document.querySelector("#phone");
var iti = window.intlTelInput(input, {
  utilsScript:
    "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.0/build/js/utils.js",
});

window.iti = iti;

const userButton = document.getElementById("user-button");
const mobileButton = document.getElementById("mobile-button");
const modal = document.getElementById("modal");
const userName = document.querySelector(".user_info");

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

if (window.innerWidth <= 768) {
  userButton.id = "user-button-mobile";
}

userButton.addEventListener("click", function () {
  if (userInfo) {
    window.location.href = "#";
  } else {
    openModal();
  }
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

mobileButton.addEventListener("click", openModal);

function openModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
}

if (userInfo) {
  userName.textContent = userInfo.userName;
}

const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

nextBtnFirst.addEventListener("click", function (event) {
  event.preventDefault();

  const firstNameInput = document.querySelector(
    ".slide-page .field input[type='text'][placeholder='First Name']"
  );
  const lastNameInput = document.querySelector(
    ".slide-page .field input[type='text'][placeholder='Last name']"
  );

  if (firstNameInput.value.trim() === "" || lastNameInput.value.trim() === "") {
    alert("Please fill in all required fields.");
    return;
  }
  slidePage.style.marginLeft = "-25%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});

nextBtnSec.addEventListener("click", function (event) {
  event.preventDefault();

  const userEmail = document.querySelector(".email");
  const userPhone = document.querySelector(".tel");

  if (userEmail.value.trim() === "" || userPhone.value.trim() === "") {
    alert("Please fill in all required fields.");
    return;
  }
  slidePage.style.marginLeft = "-50%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});

nextBtnThird.addEventListener("click", function (event) {
  event.preventDefault();

  const userEmail = document.querySelector(".date");
  const userPhone = document.querySelector(".tel");

  if (userEmail.value.trim() === "" || userPhone.value.trim() === "") {
    alert("Please fill in all required fields.");
    return;
  }
  slidePage.style.marginLeft = "-75%";
  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const userNameImp = document.querySelector(".username_important");
  const userPassword = document.querySelector(".tel");

  if (userNameImp.value.trim() === "" || userPassword.value.trim() === "") {
    alert("Please fill in all required fields.");
    return;
  }

  const userInfo = {
    userName: userNameImp.value.trim(),
    userPassword: userPassword.value.trim(),
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));

  bullet[current - 1].classList.add("active");
  progressCheck[current - 1].classList.add("active");
  progressText[current - 1].classList.add("active");
  current += 1;
  setTimeout(function () {
    alert("Your Form Successfully Signed up");
    location.reload();
  }, 800);
});

prevBtnSec.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "0%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});

prevBtnThird.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-25%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});

prevBtnFourth.addEventListener("click", function (event) {
  event.preventDefault();
  slidePage.style.marginLeft = "-50%";
  bullet[current - 2].classList.remove("active");
  progressCheck[current - 2].classList.remove("active");
  progressText[current - 2].classList.remove("active");
  current -= 1;
});

const userNameElement = document.getElementById("username");
const dropdownMenuList = document.getElementById("dropdown-menu");
const dropdownIcon = document.querySelector(".dropdown-icon");

function toggleDropdown() {
  dropdownMenuList.classList.toggle("show");
}

document.getElementById("user-info").addEventListener("click", toggleDropdown);

window.addEventListener("click", function (event) {
  if (
    !event.target.matches(".user-info") &&
    !event.target.matches(".dropdown-icon")
  ) {
    dropdownMenuList.classList.remove("show");
  }
});
dropdownIcon.classList.remove("hidden");

const profileImageInput = document.getElementById("profile-image-input");
const profileImage = document.getElementById("profile-image");

profileImageInput.addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function () {
      const imageDataURL = reader.result;
      profileImage.src = imageDataURL;
    };
    reader.readAsDataURL(file);
  }
});

function toggleDropdown() {
  if (userInfo) {
    dropdownMenuList.classList.toggle("show");
  }
}

if (userInfo) {
  userName.textContent = userInfo.userName;
  dropdownIcon.style.display = "block";
}

if (userInfo) {
  userName.textContent = userInfo.userName;
  dropdownIcon.classList.remove("hidden");
}

const logoutButton = document.querySelector(".log-out");

logoutButton.addEventListener("click", logout);

function logout(event) {
  event.preventDefault();

  localStorage.removeItem("userInfo");

  location.reload();
}