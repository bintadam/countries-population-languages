const btnPopulation = document.querySelector(".btn-population");
const btnLanguage = document.querySelector(".btn-language");

document.getElementById('chart').style.display = "none"

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
        const newObject = {name:"World", population: 8037642469}
        
        tenMostPopulatedCountries.unshift(newObject)
        console.log(tenMostPopulatedCountries)

        function populationChart(tenMostPopulatedCountries){
            // find maximum population
           let maxPopulation = Math.max.apply(Math,  tenMostPopulatedCountries.map(function(country) { return country.population; }));

            // calculate scale factor
            let scaleFactor = 500 / maxPopulation;

            // select chart div
            let chart = document.getElementById('chart');
    
            // clear previous chart
            chart.innerHTML = ""

            // for each country
            for (let i = 0; i < tenMostPopulatedCountries.length; i++){
                // create bar div
                let bar = document.createElement('div');
                bar.className = 'bar';
                bar.style.width = (tenMostPopulatedCountries[i].population * scaleFactor) + 'px';
                let barName = document.createElement('div');
                barName.className = 'bar-name';
                barName.textContent = tenMostPopulatedCountries[i].name.toLocaleString();

                // create label div
                let barLabel = document.createElement('div');
                barLabel.className = 'bar-label';
                barLabel.textContent = tenMostPopulatedCountries[i].population.toLocaleString();

                // append label and barname to bar
                bar.appendChild(barName);
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

        const counts = [];
        const count = {};

        const langset = new Set(names)
        for(const language of langset){
            const filteredLng = names.filter((lng)=> lng === language);
            counts.push({lang:language, count:filteredLng.length})
        }
      
        const frequentLanguage = counts.sort((a, b) => b.count-a.count)
        const mostFrequentLanguage = frequentLanguage.slice(0, 10)

        function languagesChart(mostFrequentLanguage){
            let frequentLanguages = Math.max.apply(Math, mostFrequentLanguage.map(function(language){return language.count}))
            let scaleFactor = 500/frequentLanguages
            let chart = document.getElementById('chart')

            chart.innerHTML = ""
            for(let i = 0 ; i<mostFrequentLanguage.length; i++){
                let bar = document.createElement('div')
                bar.className = 'bar'
                bar.style.width = (counts[i].count * scaleFactor) + 'px'

                let barName = document.createElement('div')
                barName.className = 'bar-name'
                barName.textContent = counts[i].lang.toLocaleString()

                let barLabel = document.createElement('div')
                barLabel.className = 'bar-label'
                barLabel.textContent = counts[i].lang.toLocaleString()

                bar.appendChild(barName)
                bar.appendChild(barLabel)

                chart.appendChild(bar)
            }
        }

        btnPopulation.addEventListener("click", function(e){
            e.preventDefault()
            populationChart(tenMostPopulatedCountries)
            document.getElementById('chart').style.display = 'block'
        })
            // const important = document.querySelector('.important')
            // important.classList.add('countries').textContent = '10 Most Spoken languages in the world'
        btnLanguage.addEventListener('click', function(e){
            e.preventDefault()
            languagesChart(mostFrequentLanguage)
            document.getElementById('chart').style.display = 'block'
        })
    } catch(err){
        console.error(err)
    }
}
countryData()
