const searchButton = document.querySelector('.search__button');
const countryInput = document.querySelector('.search__input');
const mainElement = document.querySelector('.main');
let countries = [];

const filterButton = document.querySelector('.filter__button');
const filterMenu = document.querySelector('.filter__menu');

const loadCountries = async () => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        countries = await response.json();
        displayCountries(countries);
        createUniqueArrayOfRegions(countries);
        
    } catch (err) {
        console.error(err);
    }
};

const displayCountries = (countries) => {
    let countryList = countries.map((country) => {
        return `<div class="main__card card">
        <img class="card__img img" src="${country.flags.svg}" alt="country-flag">
        <h3 class="card__name name">${country.name.official}</h3>
        <div class="card__population population">Population: ${country.population}</div>
        <div class="card__region region">Region: ${country.region}</div>
        <div class="card__capital capital">Capital: ${country.capital}</div>
        </div>`;
    });
    countryList = countryList.join("");
    mainElement.innerHTML = countryList;
};

countryInput.addEventListener("keyup", (e) => {
    const targetCountry = e.target.value.toLowerCase();
    const filteredCountries = countries.filter(country => {
        return(
        country.name.official.toLowerCase().includes(targetCountry) || 
        country.name.common.toLowerCase().includes(targetCountry)
        );
    });
    displayCountries(filteredCountries);
});

filterButton.addEventListener('click', () => {
    isVisible();
});

function createUniqueArrayOfRegions (countries) {
    const allRegions = [];
    const unique = (value, index, self) => {
        return self.indexOf(value) === index
    };
    const mappedRegions = countries.map((country) => {
        allRegions.push(country.region);
    });
    const regions = allRegions.filter(unique);
    displayRegions(regions);
};

function displayRegions(regions) {
    let displayFilter = regions.map(region => {
        return `<div class="filter__item">${region}</div>`;
    });
    displayFilter = displayFilter.join("");
    filterMenu.innerHTML = displayFilter;
};

function isVisible () {
    if(filterMenu.style.display === "none") {
        filterMenu.style.display = "flex";
    } else {
        filterMenu.style.display = "none";
    }
};
loadCountries();