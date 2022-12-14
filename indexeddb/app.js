import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

const db = new Dexie('pokemonDB');

db.version(1).stores({
    pokemon: '++id, number, name'
});

db.on('populate', async () => {
    //Top-level await if out of async func, cause of module
    await db.pokemon.bulkPut([
        { name: 'Bulbasaur', number: 1, picture: await downloadImage(buildUrl(1)) },
        { name: 'Charmander', number: 4, picture: await downloadImage(buildUrl(4)) },
        { name: 'Squirtle', number: 7, picture: await downloadImage(buildUrl(7)) },
        { name: 'Pikachu', number: 25, picture: await downloadImage(buildUrl(25)) }
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

async function retrieveData() {

    const pokemonList = await db.pokemon.toArray();
    
    const pokeHTML = pokemonList.map(toHTML).join('');
    document.getElementById('pokemon').innerHTML = `<div id="pokedex" class="pokedex">${pokeHTML}</div>`;
    
    function toHTML(poke) {
        return `
            <div class="card grass">
                <header>
                    <h2>#${poke.number}</h2>
                </header>
                <img src="${URL.createObjectURL(poke.picture)}" alt="${poke.name}" title="${poke.name}">
                <footer class="grass">
                <span>${poke.name}</span>
                </footer>
            </div>
        `;
    }
}

retrieveData();

async function downloadImage(imageUrl) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return blob;
}

async function saveFormData(event) {
    event.preventDefault();
    const form = event.target;
    await saveOnDb({
        name: form.name.value,
        pokeNumber: form.pokeNumber.value
    });
    retrieveData();
    form.reset();
    form.name.focus();
}

async function saveOnDb({ name, pokeNumber }) {
    const pokemon = await db.pokemon.where('name').equals(name).toArray();
    if (pokemon.length === 0) {
        await db.pokemon.add({
            name,
            number: pokeNumber,
            picture: await downloadImage(await buildUrl(pokeNumber))
        });
    }
}

const form = document.querySelector('form')
form.addEventListener('submit', saveFormData)
