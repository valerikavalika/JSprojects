//get filter elements
const searchElement = document.querySelector(".aside-bar__input");
const companyFilterElement = document.querySelector(".filter-list");
const priceInputElement = document.querySelector(".price-filter__range");
const priceValueElement = document.querySelector(".price-filter__value");

//get products list element
const productItemsElement = document.querySelector(".products__items");


//display all products in products list 
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
  
  //display price filter/ set price filter at max value
  const displayPriceFilter = (furniture) => {
    let maxPrice = furniture.map((product) => product.price);
    maxPrice = Math.max(...maxPrice);
    maxPrice = Math.ceil(maxPrice);
    priceInputElement.max = maxPrice;
    priceInputElement.min = 0;
    priceInputElement.value = maxPrice;
    sessionStorage.setItem("filterByPrice", maxPrice);
    priceValueElement.textContent = `Price: $${maxPrice}`;
  };
  
  //add price listener 
  priceInputElement.addEventListener("input", function () {
    filterByPrice(furniture);
  });
  
  //filter depending on price passed
  const filterByPrice = (furniture) => {
    const value = parseInt(priceInputElement.value);
    priceValueElement.innerHTML = `Price: $${value}`;
    let filteredProductsByPrice = furniture.filter(
      (product) => product.price <= value
    );
    if (filteredProductsByPrice < 1) {
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
  
  // display all companies, show number of products next to company
  const displayCompanyCounter = (furniture, filteredFurniture) => {
    //create an array from all companies with duplicates
    const companies = createCompaniesArray(furniture, filteredFurniture);
    //create unique array of companies
    const uniqueCompanies = createUniqueCompanyArray(furniture);
    //get all company buttons
    const elements = uniqueCompanies.map((company) =>
      document.getElementById(company)
    );
    //create an object with companies as keys and 0 as values
    const count = {};
    uniqueCompanies.forEach((element) => {
      count[element] = count[element] || 0;
    });
    //increase a value in object by 1 when duplicate in array found
    companies.forEach((element) => {
      count[element] = (count[element] || 0) + 1;
    });
    //get sum of all values in object and set it as value to 'All' key 
    let all = 0;
    for (const value of Object.values(count)) {
      all += value;
    }
    count.All = all;
    //create an array of all company filter buttons
    let allButtons = [];
    for (let key in count) {
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
  };
  
  //add listener to parent of company buttons
  companyFilterElement.addEventListener("click", (e) => {
    const element = e.target;
    if (element.classList.contains("filter-list__name")) {
      filterByCompany(element, furniture);
    }
  });
  
  //checks the company counter
  function checkTheCounter() {
    //get all buttons 
    const buttonCollection = companyFilterElement.children;
    //create an object of all companies as keys and actuall count of products as values
    let countObject = {};
    for (let button of buttonCollection) {
      //add to object all keys and values 0
      countObject[button.id] = countObject[button.id] || 0;
      // add to object all values
      let count = button.children[0].innerText.split("");
      count = count[1];
      countObject[button.id] = count;
    }
    //check the value of key - if 0 - disable a button with key
    let entries = Object.entries(countObject);
    for (let i = 0; i < entries.length; i++) {
      if (entries[i][1] === "0") {
        disableButton(entries[i][0]);
      } else {
        activateButton(entries[i][0]);
      }
    }
  }
  
  //dispable the button
  function disableButton(id) {
    const element = document.getElementById(id);
    element.disabled = true;
    element.classList.add("disabled");
  }
  
  //activate the button
  function activateButton(id) {
    const element = document.getElementById(id);
    element.disabled = false;
    element.classList.remove("disabled");
  }
  
  //return an array from all companies with duplicates
  function createCompaniesArray(furniture, filteredFurniture) {
    let companies = [];
    if (filteredFurniture === "") {
      companies = furniture.map((item) => item.company);
    } else {
      companies = filteredFurniture.map((item) => item.company);
    }
    return companies;
  };
  
  //return an array from all companies - only unique values
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
  }
  
  //filter by company
  const filterByCompany = (element, furniture) => {
    let filteredFurnitureByCompany = [];
    if (element.id === "All") {
      sessionStorage.setItem("filterByCompany", "All");
      checkAllFilters(furniture);
    } else {
      filteredFurnitureByCompany = furniture.filter(
        (item) => item.company === element.id
      );
      sessionStorage.setItem("filterByCompany", `${element.id}`);
      checkAllFilters(furniture);
    }
  };
  
  //check all the values of all filters 
  const checkAllFilters = (furniture) => {
    const filterByCompany = sessionStorage.getItem("filterByCompany");
    const filterByPrice = sessionStorage.getItem("filterByPrice");
    if (filterByCompany === "All") {
      const filteredProducts = furniture.filter(
        (item) => item.price <= filterByPrice
      );
      displayProductsList(filteredProducts);
    } else {
      const filteredProducts = furniture.filter(
        (item) => item.company === filterByCompany && item.price <= filterByPrice
      );
      displayProductsList(filteredProducts);
    }
  };
  
  // search input logic
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
  