const listaPokemons = document.getElementById("listaPokemons"); // Busca o elemento com id "listaPokemons"
const btnBuscar = document.getElementById("btnBuscar"); // Busca o elemento com id "btnBuscar"
const cardHolder = document.getElementById("cardHolder"); // Busca o elemento com id "cardHolder"

let pokemonEscolhido = null; // Inicializa a variável que receberá o Pokémon escolhido pelo usuário

const LIMITE_POKEMONS = 151; // Limite de Pokémons buscados pela API

async function ListaPokemons() {
    try {
        listaPokemons.innerHTML = '<p class="status-message">Carregando Lista da PokeAPI...</p>';
        const resposta = await fetch('https://pokeapi.co/api/v2/pokemon/limit=${LIMITE_POKEMONS}');
        if (!resposta.ok) throw new Error('Erro ao carregar lista.');

        const dados = await resposta.json();

        carregarLista(dados.results);
    } catch{
        listaPokemons.innerHTML = '<p class="status-message">${erro.message}</p>';
    }
}

function carregarLista(pokemons) {
    listaPokemons.innerHTML = pokemons.map(poke =>
        '<button type="button" class="pokemon-chip" data-nome="${poke.name}">${poke.name}</button>'
    ).join('');

    const chips = listaPokemons.querySelectorAll('.pokemon-chip');
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            chips.forEach(c => c.classList.remove('selecionado'));
            chip.classList.add('selecionado');
            pokemonSelecionado = chip.getAttribute('data-nome');
            btnBuscar.disabled = false;
            btnBuscar.textContent = 'Buscar ${pokemonSelecionado.toUpperCase()}';
        });
    });
}
