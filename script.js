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
                name: country.name,
                population: country.population
            }
              
        })

        const highestPopulatedCountry =  targetCountries.sort((a,b) => b.population-a.population)
        console.log(highestPopulatedCountry)

        btnPopulation.addEventListener("click", function(e){

        })

        const targetLanguages = countries.map(country => {
            countryLanguage.push(country.languages)
        })
        

    } catch(err){
        console.error(err)
    }
}
countryData()
