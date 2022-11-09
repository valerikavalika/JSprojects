const searchButton = document.querySelector('.search__button');
const countryInput = document.querySelector('.search__input');
const mainElement = document.querySelector('.main');
let countries = [];

const filterButton = document.querySelector('.filter__button');
const filterMenu = document.querySelector('.filter__menu');

const darkModeButton = document.querySelector('.dark-mode-button');
const bodyElement = document.querySelector('.body');
const cardElement = document.getElementsByClassName('card');

const loadCountries = async () => {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all`);
        countries = await response.json();
        displayCountries(countries);
        
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
    checkTheLightDarkMode();
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
    const regions = createUniqueArrayOfRegions(countries);
    displayRegions(regions);
    isVisible();
    addRegionFilterListener(regions);
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
    return regions;
};

function displayRegions(regions) {
    let displayFilter = regions.map(region => {
        return `<div class="filter__item" id="${region}">${region}</div>`;
    });
    displayFilter = displayFilter.join("");
    filterMenu.innerHTML = displayFilter;
};

function isVisible () {
    if(filterMenu.style.display == "none") {
        filterMenu.style.display = "flex";
    } else {
        filterMenu.style.display = "none";
    }
};

function addRegionFilterListener(regions) {
    const targetRegion = regions.forEach(region => {
        const targetRegionElement = document.getElementById(`${region}`);
        targetRegionElement.addEventListener('click', (e) => {
            e.preventDefault();
            filterCountriesByRegion(e.target.id);
        });
    });
};

function filterCountriesByRegion(region_id) {
    const filteredCountriesbyRegion = [];
    const filterByRegion = countries.map((country) => {
        if(country.region === region_id) {
            filteredCountriesbyRegion.push(country);
        }
        displayCountries(filteredCountriesbyRegion);
    });
};


darkModeButton.addEventListener('click', (e) => {
e.preventDefault();
changeTheLightDarkMode();
});


function changeTheLightDarkMode() {
    if (darkModeButton.innerHTML === "<svg stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" viewBox=\"0 0 24 24\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.742,13.045c-0.677,0.18-1.376,0.271-2.077,0.271c-2.135,0-4.14-0.83-5.646-2.336c-2.008-2.008-2.799-4.967-2.064-7.723 c0.092-0.345-0.007-0.713-0.259-0.965C10.444,2.04,10.077,1.938,9.73,2.034C8.028,2.489,6.476,3.382,5.241,4.616 c-3.898,3.898-3.898,10.243,0,14.143c1.889,1.889,4.401,2.93,7.072,2.93c2.671,0,5.182-1.04,7.07-2.929 c1.236-1.237,2.13-2.791,2.583-4.491c0.092-0.345-0.008-0.713-0.26-0.965C21.454,13.051,21.085,12.951,20.742,13.045z M17.97,17.346c-1.511,1.511-3.52,2.343-5.656,2.343c-2.137,0-4.146-0.833-5.658-2.344c-3.118-3.119-3.118-8.195,0-11.314 c0.602-0.602,1.298-1.102,2.06-1.483c-0.222,2.885,0.814,5.772,2.89,7.848c2.068,2.069,4.927,3.12,7.848,2.891 C19.072,16.046,18.571,16.743,17.97,17.346z\"></path></svg>") {
        darkModeButton.innerHTML = "<svg stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" viewBox=\"0 0 512 512\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z\"></path></svg>";
        setDarkMode();
    } else if (darkModeButton.innerHTML === "<svg stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" viewBox=\"0 0 512 512\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z\"></path></svg>") {
        darkModeButton.innerHTML = "<svg stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" viewBox=\"0 0 24 24\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.742,13.045c-0.677,0.18-1.376,0.271-2.077,0.271c-2.135,0-4.14-0.83-5.646-2.336c-2.008-2.008-2.799-4.967-2.064-7.723 c0.092-0.345-0.007-0.713-0.259-0.965C10.444,2.04,10.077,1.938,9.73,2.034C8.028,2.489,6.476,3.382,5.241,4.616 c-3.898,3.898-3.898,10.243,0,14.143c1.889,1.889,4.401,2.93,7.072,2.93c2.671,0,5.182-1.04,7.07-2.929 c1.236-1.237,2.13-2.791,2.583-4.491c0.092-0.345-0.008-0.713-0.26-0.965C21.454,13.051,21.085,12.951,20.742,13.045z M17.97,17.346c-1.511,1.511-3.52,2.343-5.656,2.343c-2.137,0-4.146-0.833-5.658-2.344c-3.118-3.119-3.118-8.195,0-11.314 c0.602-0.602,1.298-1.102,2.06-1.483c-0.222,2.885,0.814,5.772,2.89,7.848c2.068,2.069,4.927,3.12,7.848,2.891 C19.072,16.046,18.571,16.743,17.97,17.346z\"></path></svg>";
        setLightMode();
    }
};

function checkTheLightDarkMode() {
    if (darkModeButton.innerHTML === "<svg stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" viewBox=\"0 0 24 24\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.742,13.045c-0.677,0.18-1.376,0.271-2.077,0.271c-2.135,0-4.14-0.83-5.646-2.336c-2.008-2.008-2.799-4.967-2.064-7.723 c0.092-0.345-0.007-0.713-0.259-0.965C10.444,2.04,10.077,1.938,9.73,2.034C8.028,2.489,6.476,3.382,5.241,4.616 c-3.898,3.898-3.898,10.243,0,14.143c1.889,1.889,4.401,2.93,7.072,2.93c2.671,0,5.182-1.04,7.07-2.929 c1.236-1.237,2.13-2.791,2.583-4.491c0.092-0.345-0.008-0.713-0.26-0.965C21.454,13.051,21.085,12.951,20.742,13.045z M17.97,17.346c-1.511,1.511-3.52,2.343-5.656,2.343c-2.137,0-4.146-0.833-5.658-2.344c-3.118-3.119-3.118-8.195,0-11.314 c0.602-0.602,1.298-1.102,2.06-1.483c-0.222,2.885,0.814,5.772,2.89,7.848c2.068,2.069,4.927,3.12,7.848,2.891 C19.072,16.046,18.571,16.743,17.97,17.346z\"></path></svg>") {
        setLightMode();
    } else if (darkModeButton.innerHTML === "<svg stroke=\"currentColor\" fill=\"currentColor\" stroke-width=\"0\" viewBox=\"0 0 512 512\" height=\"1em\" width=\"1em\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z\"></path></svg>") {
        setDarkMode();
    }
};

function setDarkMode() {
    bodyElement.style.backgroundColor = "black";
    countryInput.style.backgroundColor = "black";
    countryInput.style.color = "azure";
    Array.from(cardElement).forEach(element => {
        element.style.backgroundColor = "rgb(89, 124, 114)";
    });
};

function setLightMode() {
    bodyElement.style.backgroundColor = "rgb(195, 231, 220)";
    countryInput.style.backgroundColor = "azure";
    countryInput.style.color = "black";
    Array.from(cardElement).forEach(element => {
        element.style.backgroundColor = "azure";
    });
};

loadCountries();