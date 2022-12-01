//get main sections elements
const aboutSection = document.querySelector(".about");
const productsSection = document.querySelector(".products");
const featuredSection = document.querySelector(".featured");
const mainBlockSection = document.querySelector(".main-block");
const mainBlockBackgroundImage = document.querySelector(".main-block__background-image");
const featuredProductsElement = document.querySelector(".featured__products");


//display 3 random products as featured
function displayFeaturedProducts(furniture) {
    const randomNumber = getRandomNumber(furniture);
    const arrayOfRandoms = createRandomArray(randomNumber);
    let randomProducts = arrayOfRandoms.map((random) => {
      return `<div class="featured__product">
      <div class="featured__image-container">
      <img
        class="featured__image"
        src="${furniture[random].image}"
        alt="furniture-item"
      />
      </div>
      <p class="featured__name">${furniture[random].name}</p>
      <p class="featured__price">$${furniture[random].price}</p>
    </div>`;
    });
    randomProducts = randomProducts.join("");
    featuredProductsElement.innerHTML = randomProducts;
  }
  
  // function returns random number -- min:0, max: products from json length
  function getRandomNumber(furniture) {
    let max = furniture.length;
    const randomNumber = Math.floor(Math.random() * max);
    return randomNumber;
  }
  
  //function creates an array(3) of randoms depending on number passed 
  function createRandomArray(randomNumber) {
    const arrayOfRandoms = [];
    arrayOfRandoms.push(randomNumber);
    if (randomNumber <= furniture.length && randomNumber > 1) {
      for (let i = 1; i < 3; i++) {
        arrayOfRandoms.push(randomNumber - i);
      }
    } else if (randomNumber <= 1) {
      for (let i = 1; i < 3; i++) {
        arrayOfRandoms.push(randomNumber + i);
      }
    }
    return arrayOfRandoms;
  };
