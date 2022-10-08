import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

const db = new Dexie('pokemonDB');

db.version(1).stores({
    pokemon: '++id, name'
});

db.on('populate', async () => {
    //Top-level await if out of async func, cause of module
    await db.pokemon.bulkPut([
        { name: 'Bulbasaur', picture: await downloadImage(buildUrl(1)) },
        { name: 'Charmander', picture: await downloadImage(buildUrl(4)) },
        { name: 'Squirtle', picture: await downloadImage(buildUrl(7)) },
        { name: 'Pikachu', picture: await downloadImage(buildUrl(25)) }
    ]);
});

db.open();

function buildUrl(pokeNumber) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeNumber}.png`;
}

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
document.getElementById('pokemon').innerHTML = `<div id="pokedex" class="pokedex">${pokeHTML}</div>`;

function toHTML(poke) {
    return `
        <div class="card grass">
            <header>
                <h2>#${poke.id}</h2>
            </header>
            <img src="${URL.createObjectURL(poke.picture)}" alt="${poke.name}" title="${poke.name}">
            <footer class="grass">
            <span>${poke.name}</span>
            </footer>
        </div>
    `;
}

async function downloadImage(imageUrl) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return blob;
}

function saveFormData(event) {
    event.preventDefault();
    const form = event.target;
    console.log(form.name.value);
    console.log(form.pokeNumber.value);
}

const form = document.querySelector('form')
form.addEventListener('submit', saveFormData)
