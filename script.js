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

            const canvas =  document.getElementById('chartCanvas');
            const ctx = canvas.getContext('2d');

             // Define chart dimensions
            const chartWidth = canvas.width;
            const chartHeight =  canvas.height;

             // Find the maximum value in the data
            const maxValue = Math.max(...tenMostPopulatedCountries.map(item => item.population));

            // Calculate the width of each bar
            const barWidth =  chartWidth/ maxValue

            // Clear the canvas
            ctx.clearRect(0, 0, chartWidth, chartHeight);

            // iterate over the data and draw the bars
            tenMostPopulatedCountries.forEach((item, index) => {
                // Calculate the width of the current bar
                const currentBarWidth = (item.value/maxValue) * barWidth;
                // Calculate the x-coordinate of the current bar
                const x = 0
                // Calculate the x-coordinate of the current bar
                const y  = index * (chartHeight/tenMostPopulatedCountries.length)
                // Set the fill color
                ctx.fillStyle = 'orange';
                ctx.fillRect(x, y, currentBarWidth,chartHeight/tenMostPopulatedCountries.length/2);
                
                /// Set the country label color
                ctx.fillStyle = 'black';
                ctx.fillText(item.name, 5, y +(chartHeight/tenMostPopulatedCountries.length/2));
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
            populationChart(tenMostPopulatedCountries)
        })


    } catch(err){
        console.error(err)
    }
}
countryData()
