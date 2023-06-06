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


        function populationChart(tenMostPopulatedCountries){
            // Sort the data
            const highestPopulatedCountry =  targetCountries.sort((a,b) => b.population-a.population)
            const tenMostPopulatedCountries = highestPopulatedCountry.slice(0,10)
            
            const margin = {top:30, right:40, bottom:10, left:150};
            const width = 960-margin.left - margin.right;
            const height = 500- margin.top - margin.bottom;

            // X scale
            const x =  d3.scaleLinear().range([0, width]).domain([0, d3.max(data, d => d.population)]);

            // Y scale
            const y = d3.scaleBand().rangeRound([0, height]).padding(0.1).domain(tenMostPopulatedCountries.map(d => d.name));

            // Create SVG
            const svg = d3.select("#barChart").append("svg")
                .attr("width", width + margin.left + margin.right)        
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," +  margin.top + ")");

                // Create bars
            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("y", d => y(d.name))
                .attr("height", y.bandwidth())
                .attr("x", 0)
                .attr("width", d => x(d.population));

            // Create X axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Create Y axis
            svg.append("g")
                .attr("class", "y axis")
                .call(d3.axisLeft(y));

                // Add text
            svg.selectAll(".text")
                .data(data)
                .enter()
                .append("text")
                .attr("class","label")
                .attr("x", (d => x(d.population) + 3))
                .attr("y", (d => y(d.name) + y.bandwidth() / 2 + 4))
                .text((d => d.population));
            
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
