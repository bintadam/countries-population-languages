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
    

        function populationChart(){
            const canva =  document.getElementById('chartCanvas');
            const ctx = canva.getContext('2d');

            const chartWidth = canva.width;
            const chartHeight =  canva.height;
            const barHeight = chartWidth/ tenMostPopulatedCountries.length;

            const maxValue = Math.max(...tenMostPopulatedCountries.map(item => item.value));

            ctx.clearRect(0, 0, chartWidth, chartHeight);

            tenMostPopulatedCountries.forEach((item, index) => {
                const barWidth = (item.value/maxValue) * chartWidth;
                const x = 0
                const y  = index * barHeight

                ctx.fillStyle = 'blue';
                ctx.fillRect(x, y, barWidth, barHeight);
    
                ctx.fillStyle = 'black';
                ctx.fillText(item.label, 5, y + barHeight / 2);
            });
        }
        console.log(populationChart)

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
            // populationChart(tenMostPopulatedCountries)
        })


    } catch(err){
        console.error(err)
    }
}
countryData()
