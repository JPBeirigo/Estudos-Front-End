
function convertPokemonTypesToLI(PokemonTypes){
    return PokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

function convertPokemonToLI (pokemon){
    return `
        <li class="pokemon">
                <span class="number">#${pokemon.order}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">     
                    <ol class="types">
                        ${convertPokemonTypesToLI(pokemon.types).join('')}
                    </ol>
                    <img src="${pokemon.sprites.other.showdown.front_default}" alt="${pokemon.name}">
                </div>
            </li>
        `
}

const pokemonList = document.getElementById('pokemonList')

pokeApi.getPokemons().then((pokemons = []) => {
    const newHTML = pokemons.map(convertPokemonToLI).join('')
    pokemonList.innerHTML = newHTML
})