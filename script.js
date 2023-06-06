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
        

        function populationChart(tenMostPopulatedCountries){
            console.log(tenMostPopulatedCountries)
            // extracte the country name and population
            const name =  tenMostPopulatedCountries.map(item => item.name);
            const population= tenMostPopulatedCountries.map(item => item.population);

            // CGet the existing canvas element to render
            const canvas = document.getElementById('chartCanvas')
            const chart = new Chart(canvas, {
                type: 'horizontalBar',
                data: {
                    labels:name,
                    datasets: [
                        {
                            label: 'population',
                            data: population,
                            borderWidth: 1,
                            ackgroundColor: 'rgba(54, 162, 235, 0.5)'
                        }
                    ]
                },
                Options:{
                    scales:{
                        x:{
                            beginAtZero: true
                        }
                    }
                }
            });
            
        }

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

        const frequentLanguage =() => {
            const langset = new Set(names)
            console.log()
            const counts = [];
            const count = {};
    
            for(const language of langset){
                const filteredLng = names.filter((lng)=> lng === language);
                counts.push({lang:language, count:filteredLng.length})
            }
            return counts
        }
        frequentLanguage()

        btnPopulation.addEventListener("click", function(e){
            e.preventDefault()
            const important = document.querySelector('.important')
            // important.classList.add('countries').textContent = '10 Most Spoken languages in the world'
            populationChart(tenMostPopulatedCountries)
        })


    } catch(err){
        console.error(err)
    }
}
countryData()
