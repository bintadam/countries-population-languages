const btnPopulation = document.querySelector(".btn-population")
const btnLanguage = document.querySelector(".btn-language")

const countriesAPI = 'https://restcountries.com/v2/all'
let arr = []

const fectchApi = fetch(countriesAPI)
.then(Response => Response.json())
.then(data => {
    let countriesData =  data;
    countriesData.map(country => {
        console.log(country)
        arr.push(country)
    })
    // console.log(arr)
})
.catch(error => console.error(error)
)

const population = () => {

}

population()