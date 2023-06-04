const btnPopulation = document.querySelector(".btn-population");
const btnLanguage = document.querySelector(".btn-language");

const countriesAPI = 'https://restcountries.com/v2/all';

const countryData = async () => {
    try{
        const response = await fetch(countriesAPI);
        const countries =  await response.json()
        // console.log(countries)
        let countryLanguage = [];
        
        const targetCountries = countries.map(country => {
            return {
                country: country.name,
                population: country.population
            }
              
        })
        console.log(targetCountries)

        const targetLanguages = countries.map(country => {
            countryLanguage.push(country.languages)
        })
        console.log(targetLanguages)

    } catch(err){
        console.error(err)
    }
}
countryData()
