import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

const db = new Dexie('pokemonDB');

db.version(1).stores({
    pokemon: '++id, name'
});

db.on('populate', async () => {
    //Top-level await if out of async func, cause of module
    await db.pokemon.bulkPut([
        { name: 'Bulbasaur', picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
        { name: 'Charmander', picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
        { name: 'Squirtle', picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
        { name: 'Pikachu', picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' }
    ]);
});

db.open();

// function byChar(char) {
//     return function (poke) {
//         return poke.name.includes(char);
//     }
// }

//const byChar = (char) => (poke) => poke.name.includes(char);
//const pokemon = await db.pokemon.filter(byChar('a')).toArray();
//const pokemon = await db.pokemon.where('name').startsWithIgnoreCase('a').toArray();
//console.log(pokemon);

const pokemonList = await db.pokemon.toArray();

const pokeHTML = pokemonList.map(toHTML).join('');
document.body.innerHTML = `<div id="pokedex" class="pokedex">${pokeHTML}</div>`;

function toHTML(poke) {
    return `
        <div class="card grass">
            <header>
                <h2>#${poke.id}</h2>
            </header>
            <img src="${poke.picture}" alt="${poke.name}" title="${poke.name}">
            <footer class="grass">
            <span>${poke.name}</span>
            </footer>
        </div>
    `;
}
