// Função para obter o ID do Pokémon da URL
function getPokemonIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// Função que carrega e exibe os detalhes do Pokémon na página
function loadPokemonDetail() {
    const pokemonId = getPokemonIdFromUrl();

    if (pokemonId) {
        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;

        fetch(pokemonUrl)
            .then((response) => response.json())
            .then((pokemon) => {
                document.getElementById('pokemonName').textContent = pokemon.name;
                document.getElementById('pokemonDetails').innerHTML = `
                    <div class="pokemon ${pokemon.types[0].type.name}">
                        <h2 class="name">${pokemon.name}</h2>
                        <span class="number">#${pokemon.id}</span>
                        <div class="detail">
                            <ol class="types">
                                ${pokemon.types.map(type => `<li class="type ${type.type.name}">${type.type.name}</li>`).join('')}
                            </ol>
                            <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
                        </div>
                    </div>
                `;
            })
            .catch(error => console.error('Erro ao carregar detalhes do Pokémon:', error));
    }
}

loadPokemonDetail();
