$(function () {
    let count = 0;

    function getPokemonsList(limit, offset, handler) {
        $.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, handler)
    }

    function handlePokemonList(data) {
        if (data.results) {

            data.results.forEach(pokemon => {
                let pokemonId = extractPokemonId(pokemon.url);
                let name = pokemon.name;

                getPokemonDetails(pokemonId, (pokemonInf) => {
                    console.log(pokemonInf);
                    let pokemonImgUrl = pokemonInf.sprites.front_shiny;

                    let template = `<div class="pokemonPoster">
                                    <img src="${pokemonImgUrl}" class="image">
                                    <div id="pokemonName"> ${name} </div> `;

                    pokemonInf.types.forEach(typePokemon => {
                        let pokemonTypeName = typePokemon.type.name;                        
                        template += `<input type="button" class="${pokemonTypeName}Type type" value="${pokemonTypeName}"></input>`;
                    });

                    template += `</div>`;
                    $('#pokemonContainer').append(template);

                })
            });
        }
    };

    function extractPokemonId(url) {
        let temp = url.split('/');
        return temp[temp.length - 2];
    }

    function getPokemonDetails(id, handler) {
        $.get(`http://pokeapi.co/api/v2/pokemon/${id}`, handler)
    }

    $("#more").click(more);

    function more() {
        count++;
        getPokemonsList(12, count * 12, handlePokemonList);
    }


    more();
});