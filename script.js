const btnPopulation = document.querySelector(".btn-population");
const btnLanguage = document.querySelector(".btn-language");

const countriesAPI = 'https://restcountries.com/v2/all';

const countryData = async () => {
    try{
        const response = await fetch(countriesAPI);
        const countries =  await response.json()
        countries.map(country => {
            btnPopulation.addEventListener("click", function(e){
                countryName = country.name
                countryPopulation = country.population
            })
            countryName = country.name
            
        })
        
    } catch(err){
        console.error(err)
    }
}
countryData()
