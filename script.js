//main variables
let furniture = [];

//initialisation of the page
const loadFurniture = async () => {
  try {
    const response = await fetch("./furniture.json");
    furniture = await response.json();
    displayFeaturedProducts(furniture);
    displayProductsList(furniture);
    displayPriceFilter(furniture);
    displayCompanyCounter(furniture, []);
    showHomeSection();
  } catch (err) {
    console.log(err);
  }
};

loadFurniture();