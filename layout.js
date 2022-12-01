//get header elements
const homeButtonElement = document.querySelector(".category__home");
const productsButtonElement = document.querySelector(".category__products");
const aboutButtonElement = document.querySelector(".category__about");

//SPA viewing page logic

//add listeners to all header buttons
homeButtonElement.addEventListener("click", () => {
  showHomeSection();
});
productsButtonElement.addEventListener("click", () => {
  showProductsSection();
});
aboutButtonElement.addEventListener("click", () => {
  showAboutSection();
});
shoppingCartButton.addEventListener("click", () => {
  isVisibleFlex(shoppingCartElement);
});
shoppingCartCloseButton.addEventListener("click", () => {
  isNotDisplayed(shoppingCartElement);
});

//add listeners to all buttons on the main page
mainBlockButton.addEventListener("click", () => {
  showProductsSection();
});
featuredBlockButton.addEventListener("click", () => {
  showProductsSection();
});

//show sections depending on button clicked
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

//visibility functions
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
