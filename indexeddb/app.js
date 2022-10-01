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

const pokemon = await db.pokemon.toArray();
console.log(pokemon);
