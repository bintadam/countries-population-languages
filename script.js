const btnPopulation = document.querySelector(".btn-population");
const btnLanguage = document.querySelector(".btn-language");

const countriesAPI = 'https://restcountries.com/v2/all';

let arr = [];

const fectchApi = fetch(countriesAPI)
    .then(Response => Response.json())
    .then(data => {
        let countriesData =  data;
        countriesData.map(country => { 
            arr.push(country)
        })
    })
    .catch(error => console.error(error)
)
console.log(arr)

const populationCountry = arr.map(element=> {
    let p = {}
    p[element.name] = element.name;
    p[element.population] = element.population
    return p;

})

console.log(populationCountry)