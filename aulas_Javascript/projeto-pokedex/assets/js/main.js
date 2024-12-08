const offset = 10
const limit = 10

const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => console.log(jsonBody))
    .catch ((error) => console.error(error))

    /* Outra forma de declarar estas funções
    .then((response) => {
        return response.json()
    })
    .then(function(jsonBody) {
        console.log(jsonBody)
    })
    .catch (function(error){
        console.error(error)
    })
    */