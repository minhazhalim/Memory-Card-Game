const pokemonAPIBaseURL = 'https://pokeapi.co/api/v2/pokemon/';
const game = document.getElementById('game');
let isPaused = true;
let firstPick;
let matches;
const colors = {
     fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5',
}
const loadPokemon = async () => {
     const set = new Set();
     while(set.size < 8){
          const randomNumber = Math.ceil(Math.random() * 150);
          set.add(randomNumber);
     }
     const pokemonPromises = [...set].map(id => fetch(pokemonAPIBaseURL + id));
     const results = await Promise.all(pokemonPromises);
     return await Promise.all(results.map(response => response.json()));
}
const displayPokemon = (pokemon) => {
     pokemon.sort(_ => Math.random() - 0.5);
     const pokemonHTML = pokemon.map(pokemon => {
          const type = pokemon.types[0]?.type?.name;
          const color = colors[type] || '#F5F5F5';
          return `
               <div class="card" onclick="clickCard(event)" data-pokename="${pokemon.name}" style="background-color: ${color};">
                    <div class="front "></div>
                    <div class="back rotated" style="background-color:${color};">
                         <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"/>
                         <h2>${pokemon.name}</h2>
                    </div>
               </div>
          `;
     }).join("");
     game.innerHTML = pokemonHTML;
}
const getFrontAndBackFromCard = (card) => {
     const front = card.querySelector('.front');
     const back = card.querySelector('.back');
     return [front,back];
}
const rotateCards = (cards) => {
     if(typeof cards !== 'object' || !cards.length) return;
     cards.forEach(element => element.classList.toggle('rotated'));
}
const resetGame = async () => {
     game.innerHTML = "";
     isPaused = true;
     firstPick = null;
     matches = 0;
     setTimeout(async () => {
          const loadedPokemon = await loadPokemon();
          displayPokemon([...loadedPokemon,...loadedPokemon]);
          isPaused = false;
     },200);
}
resetGame();
const clickCard = (event) => {
     const pokemonCard = event.currentTarget;
     const [front,back] = getFrontAndBackFromCard(pokemonCard);
     if(front.classList.contains('rotated') || isPaused) return;
     isPaused = true;
     rotateCards([front,back]);
     if(!firstPick){
          firstPick = pokemonCard;
          isPaused = false;
     }else{
          const firstPokemonName = firstPick.dataset.pokename;
          const secondPokemonName = pokemonCard.dataset.pokename;
          if(firstPokemonName !== secondPokemonName){
               const [firstFront,firstBack] = getFrontAndBackFromCard(firstPick);
               setTimeout(() => {
                    rotateCards([front,back,firstFront,firstBack]);
                    firstPick = null;
                    isPaused = false;
               },500);
          }else{
               matches++;
               if(matches === 8){
                    console.log('winner');
               }
               firstPick = null;
               isPaused = false;
          }
     }
}