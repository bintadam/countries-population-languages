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

const population = () => {
    
}

population()