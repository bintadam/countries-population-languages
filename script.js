const btnPopulation = document.querySelector(".btn-population");
const btnLanguage = document.querySelector(".btn-language");

const countriesAPI = 'https://restcountries.com/v2/all';

const countryData = async () => {
    try{
        const response = await fetch(countriesAPI);
        const countries =  await response.json()
    
        let names = [];
        
        const targetCountries = countries.map(country => {
            return {
                name: country.name,
                population: country.population
            }
              
        })

        const highestPopulatedCountry =  targetCountries.sort((a,b) => b.population-a.population)
        const tenMostPopulatedCountries = highestPopulatedCountry.slice(0,10)
        console.log(tenMostPopulatedCountries)


        btnPopulation.addEventListener("click", function(e){

        })


        const targetLanguages = countries.map(country => {
            let countryLanguage = [];
            countryLanguage.push(country.languages)
            for(let i =0; i<countryLanguage.length; i++){
                const innerArray = countryLanguage[i];
                for(let n = 0; n<innerArray.length; n++){
                    const obj = innerArray[n]
                    const name = obj.name;
                    names.push(name)
                }
            }
            
        })
        // console.log(names)

        const langset = new Set(names)
        console.log()
        const counts = [];
        const count = {};

        for(const language of langset){
            const filteredLng = names.filter((lng)=> lng === language);
            console.log(filteredLng)
            counts.push({lang:language, count:filteredLng.length})
        }
        console.log(counts)
      

    } catch(err){
        console.error(err)
    }
}
countryData()
