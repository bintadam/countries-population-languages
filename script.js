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
            // find maximum population
            var maxPopulation = Math.max.apply(Math,  tenMostPopulatedCountries.map(function(country) { return country.population; }));

            // calculate scale factor
            var scaleFactor = 500 / maxPopulation;

            // select chart div
            var chart = document.getElementById('chart');
    
            // clear previous chart
            chart.innerHTML = ""

            // for each country
            for (var i = 0; i < tenMostPopulatedCountries.length; i++){
                // create bar div
                var bar = document.createElement('div');
                bar.className = 'bar';
                bar.style.width = (tenMostPopulatedCountries[i].population * scaleFactor) + 'px';
                bar.textContent = tenMostPopulatedCountries[i].name;

                // create label div
                var barLabel = document.createElement('div');
                barLabel.className = 'bar-label';
                barLabel.textContent = tenMostPopulatedCountries[i].population.toLocaleString();

                // append label to bar
                bar.appendChild(barLabel);

                // append bar to chart
                chart.appendChild(bar);

            }
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
            populationChart(tenMostPopulatedCountries)
        })
            // const important = document.querySelector('.important')
            // important.classList.add('countries').textContent = '10 Most Spoken languages in the world'
    } catch(err){
        console.error(err)
    }
}
countryData()
