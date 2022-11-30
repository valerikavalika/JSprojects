const productItemsElement = document.querySelector(".products__items");

const homeButtonElement = document.querySelector(".category__home");
const productsButtonElement = document.querySelector(".category__products");
const aboutButtonElement = document.querySelector(".category__about");

const aboutSection = document.querySelector(".about");
const productsSection = document.querySelector(".products");
const featuredSection = document.querySelector(".featured");
const mainBlockSection = document.querySelector(".main-block");
const mainBlockBackgroundImage = document.querySelector(
  ".main-block__background-image"
);

const shoppingCartElement = document.querySelector(".shopping-cart");
const shoppingCartButton = document.querySelector(".header__shopping-cart");
const shoppingCartCloseButton = document.querySelector(
  ".shopping-cart__close-button"
);
const shoppingCartRemoveAllButton = document.querySelector('.shopping-cart__remove-all-button');
const mainBlockButton = document.querySelector(".main-block__button");
const featuredBlockButton = document.querySelector(".featured__button-to-all");
const shoppingCartItemsElement = document.querySelector(
  ".shopping-cart__products"
);
const shoppingCartSubtotalElement = document.querySelector(
  ".shopping-cart__total"
);

const searchElement = document.querySelector(".aside-bar__input");
const companyFilterElement = document.querySelector(".filter-list");
const priceInputElement = document.querySelector('.price-filter__range');
const priceValueElement = document.querySelector('.price-filter__value');


let furniture = [];
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

const loadFurniture = async () => {
  try {
    const response = await fetch("./furniture.json");
    furniture = await response.json();
    displayProductsList(furniture);
    // displayCompaniesFilter(furniture);
	  displayPriceFilter(furniture);
    displayCompanyCounter(furniture, "");
    showHomeSection();
  } catch (err) {
    console.log(err);
  }
};

const displayProductsList = (furniture) => {
  let furnitureItems = furniture.map((item) => {
    return ` <div class="products__item product">
		<div class="product__image-container">
			<img class="product__image" src="${item.image}">
		</div>
		<p class="product__name">${item.name}</p>
		<p class="product__price">$${item.price}</p>
		<button onclick="addToCart(${item.id})" class="product__add-to-cart-button">Add to shopping cart</button>
	</div>`;
  });
  furnitureItems = furnitureItems.join("");
  productItemsElement.innerHTML = furnitureItems;
};

shoppingCartRemoveAllButton.addEventListener('click', () => {
  removeAllFromCart();
});

function removeAllFromCart() {
  localStorage.removeItem("CART");
  cart=[];
  updateCart();
};

const displayPriceFilter = (furniture) =>  {
	let maxPrice = furniture.map((product) => product.price);
	maxPrice = Math.max(...maxPrice);
	maxPrice = Math.ceil(maxPrice);
	priceInputElement.max = maxPrice;
	priceInputElement.min = 0;
	priceInputElement.value = maxPrice;
  sessionStorage.setItem("filterByPrice", maxPrice);
	priceValueElement.textContent = `Price: $${maxPrice}`;
	priceInputElement.addEventListener('input', function(){
		filterByPrice(furniture);
	});
};

const displayCompanyCounter = (furniture, filteredFurniture) => {
  let companies = [];
  let all = 0;
  const count = {};
  if(filteredFurniture === ""){
    companies = furniture.map(item => item.company);
  } else {
    companies = filteredFurniture.map(item => item.company);
  }
  const uniqueCompanies = createUniqueCompanyArray(furniture);
  const elements = uniqueCompanies.map(company => document.getElementById(company));
  uniqueCompanies.forEach(element => {
    count[element] = (count[element] || 0);
  });
  companies.forEach(element => {
    count[element] = (count[element] || 0) + 1;
  });
  for (const value of Object.values(count)) {
    all += value;
  }
  count.All = all;
  let allButtons = [];
  for (let key in count){
    let buttons = [];
    const first = `<button class="filter-company__company filter-list__name" id="${key}">
		${key}`;
    buttons.push(first);
    const second = `<span class= filter-company__company-counter>(${count[key]})</span>
	  </button>`;
    buttons.push(second);
    buttons = buttons.join("");
    allButtons.push(buttons);
  }
  allButtons = allButtons.join("");
  companyFilterElement.innerHTML = allButtons;
  companyFilterElement.addEventListener('click', (e) => {
	const element = e.target;
	if(element.classList.contains('filter-list__name')){
		filterByCompany(element, furniture);
	}
	});
};

function checkTheCounter() {
  const buttonCollection = companyFilterElement.children;
  let countObject = {};
  for(let button of buttonCollection) {
    countObject[button.id] = (countObject[button.id] || 0);
    let count = button.children[0].innerText.split('');
    count = count[1];
    countObject[button.id] = count; 
  }
  let entries = Object.entries(countObject);
  for(let i = 0; i < entries.length; i++){
    if(entries[i][1] === '0'){
      disableButton(entries[i][0]);
    } else {
      activateButton(entries[i][0]);
    }
  };
};

function disableButton(id) {
  const element = document.getElementById(id);
  element.disabled = true;
  element.classList.add("disabled");
};
function activateButton(id) {
  const element = document.getElementById(id);
  element.disabled = false;
  element.classList.remove("disabled");
};

const filterByPrice = (furniture) => {
	const value = parseInt(priceInputElement.value);
	priceValueElement.innerHTML = `Price: $${value}`;
	let filteredProductsByPrice = furniture.filter((product) => product.price <= value);
		if(filteredProductsByPrice < 1){
			productItemsElement.innerHTML = `<div class="products__items" > There is no product with this filter..</div>`;
      sessionStorage.setItem("filterByPrice", `${value}`);
      displayCompanyCounter(furniture, filteredProductsByPrice);
      checkTheCounter();
		} else {
      sessionStorage.setItem("filterByPrice", `${value}`);
      checkAllFilters(furniture);
      displayCompanyCounter(furniture, filteredProductsByPrice);
      checkTheCounter();
		}
};

function createUniqueCompanyArray(furniture) {
	const companies = [
		"All",
		...new Set(
		  furniture.map((item) => {
			return `${item.company}`;
		  })
		),
	  ];
	  return companies;
};

const filterByCompany = (element, furniture) => {
	let filteredFurnitureByCompany = [];
		if(element.id === 'All'){
      sessionStorage.setItem("filterByCompany", 'All');
      checkAllFilters(furniture);
		} else {
      filteredFurnitureByCompany = furniture.filter(item => item.company === element.id);
      sessionStorage.setItem("filterByCompany", `${element.id}`);
      checkAllFilters(furniture);
		}
};
const checkAllFilters = (furniture) => {
  const filterByCompany = sessionStorage.getItem("filterByCompany");
  const filterByPrice = sessionStorage.getItem("filterByPrice");
  if(filterByCompany === 'All'){
    const filteredProducts = furniture.filter(item => item.price <= filterByPrice);
    displayProductsList(filteredProducts);
  } else {
    const filteredProducts = furniture.filter(item => item.company === filterByCompany && item.price <= filterByPrice);
    displayProductsList(filteredProducts);
  }
};

searchElement.addEventListener("keyup", () => {
  const value = searchElement.value;
  if (value) {
    const filteredFurniture = furniture.filter((product) => {
      const { name } = product;
      name.toLowerCase();
      if (name.includes(value)) {
        return product;
      }
    });
    displayProductsList(filteredFurniture);
    displayCompanyCounter(furniture, filteredFurniture);
    checkTheCounter();
    if (filteredFurniture.length < 1) {
      productItemsElement.innerHTML = `<div class="products__items" > There is no product with this name..</div>`;
    }
  } else {
    displayProductsList(furniture);
    displayCompanyCounter(furniture, "");
    checkTheCounter();
  }
});



function addToCart(id) {
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = furniture.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  updateCart();
}

function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}

function updateCart() {
  renderCartItems();
  renderSubtotal();
  localStorage.setItem("CART", JSON.stringify(cart));
}

function renderSubtotal() {
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
  });
  shoppingCartSubtotalElement.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
}

function renderCartItems() {
  let productCartItems = cart.map((item) => {
    return `<div class="shopping-cart__product shopping-cart-product">
		<div class="shopping-cart-product__image-container">
		<img  class="shopping-cart-product__image" src="${item.image}" alt="product-image">
		</div>
		<div class="shopping-cart-product__details">
			<p class="shopping-cart-product__name">${item.name}</p>
			<p class="shopping-cart-product__price">$${item.price}</p>
			<button class="shopping-cart-product__remove-button" onclick="removeItemFromCart(${item.id})">
				<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"></path><path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"></path></svg>
			</button>
		</div>
		<div class="shopping-cart__product-count product-count">
			<button class="product-count__up-button product-count__button" onclick="changeNumberOfUnits('plus', ${item.id})">
				<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M868 545.5L536.1 163a31.96 31.96 0 0 0-48.3 0L156 545.5a7.97 7.97 0 0 0 6 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z"></path></svg>
			</button>
			<h3 class="product-count__count">${item.numberOfUnits}</h3>
			<button class="product-count__down-button product-count__button" onclick="changeNumberOfUnits('minus', ${item.id})">
				<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z"></path></svg>
			</button>
		</div>
	</div>`;
  });
  productCartItems = productCartItems.join("");
  shoppingCartItemsElement.innerHTML = productCartItems;
}

function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus") {
        numberOfUnits++;
      }
    }
    return {
      ...item,
      numberOfUnits,
    };
  });
  updateCart();
}

homeButtonElement.addEventListener("click", () => {
  showHomeSection();
});
productsButtonElement.addEventListener("click", () => {
  showProductsSection();
});
aboutButtonElement.addEventListener("click", () => {
  showAboutSection();
});

const showHomeSection = () => {
  isVisibleFlex(mainBlockSection);
  isVisibleBlock(featuredSection);
  isNotDisplayed(aboutSection);
  isNotDisplayed(productsSection);
  isVisible(mainBlockBackgroundImage);
};
const showProductsSection = () => {
  isVisibleBlock(productsSection);
  isNotDisplayed(featuredSection);
  isNotDisplayed(aboutSection);
  isNotDisplayed(mainBlockSection);
  isNotVisible(mainBlockBackgroundImage);
};
const showAboutSection = () => {
  isVisibleBlock(aboutSection);
  isNotDisplayed(featuredSection);
  isNotDisplayed(productsSection);
  isNotDisplayed(mainBlockSection);
  isNotVisible(mainBlockBackgroundImage);
};

shoppingCartButton.addEventListener("click", () => {
  isVisibleFlex(shoppingCartElement);
});
shoppingCartCloseButton.addEventListener("click", () => {
  isNotDisplayed(shoppingCartElement);
});
mainBlockButton.addEventListener("click", () => {
  showProductsSection();
});
featuredBlockButton.addEventListener("click", () => {
  showProductsSection();
});

const isNotDisplayed = (element) => {
  element.style.display = "none";
};
const isVisibleBlock = (element) => {
  element.style.display = "block";
};
const isVisibleFlex = (element) => {
  element.style.display = "flex";
};
const isVisible = (element) => {
  element.style.visibility = "visible";
};
const isNotVisible = (element) => {
  element.style.visibility = "hidden";
};

loadFurniture();
