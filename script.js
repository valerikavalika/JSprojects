const searchButton = document.querySelector('.search__button');
const countryInput = document.querySelector('.search__input');
const mainElement = document.querySelector('.main');
let countries = [];

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



loadCountries();