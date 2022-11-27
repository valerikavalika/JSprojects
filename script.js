const productItemsElement = document.querySelector('.products__items');
let furniture = [];

const homeButtonElement = document.querySelector('.category__home');
const productsButtonElement = document.querySelector('.category__products');
const aboutButtonElement = document.querySelector('.category__about');

const aboutSection = document.querySelector('.about');
const productsSection = document.querySelector('.products');
const featuredSection = document.querySelector('.featured');
const mainBlockSection = document.querySelector('.main-block');
const mainBlockBackgroundImage = document.querySelector('.main-block__background-image');
const shoppingCartElement = document.querySelector('.shopping-cart');
const shoppingCartButton = document.querySelector('.header__shopping-cart');
const shoppingCartCloseButton = document.querySelector('.shopping-cart__close-button');
const mainBlockButton = document.querySelector('.main-block__button');
const featuredBlockButton = document.querySelector('.featured__button-to-all');


const loadFurniture = async () => {
	try {
		const response = await fetch('./furniture.json');
		furniture = await response.json();
		displayProductsList(furniture);
		showHomeSection();
	} catch (err) {
		console.log(err);
	}
};

 const displayProductsList = (furniture) => {
	let furnitureItems = furniture.map(item => {
		return ` <div class="products__item product">
		<div class="product__image-container">
			<img class="product__image" src="${item.image}">
		</div>
		<p class="product__name">${item.name}</p>
		<p class="product__price">$${item.price}</p>
		<button class="product__add-to-cart-button">Add to shopping cart</button>
	</div>`;
	});
	furnitureItems = furnitureItems.join("");
	productItemsElement.innerHTML = furnitureItems;
 };
 
 homeButtonElement.addEventListener('click', () => {
	showHomeSection();
 });
 productsButtonElement.addEventListener('click', () => {
	showProductsSection();
 });
 aboutButtonElement.addEventListener('click', () => {
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

 shoppingCartButton.addEventListener('click', () => {
	isVisibleFlex(shoppingCartElement);
 });
 shoppingCartCloseButton.addEventListener('click', () => {
	isNotDisplayed(shoppingCartElement);
 });
 mainBlockButton.addEventListener('click', () => {
	showProductsSection();
 });
 featuredBlockButton.addEventListener('click', () => {
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