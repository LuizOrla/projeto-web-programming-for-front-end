const listaPokemons = document.getElementById("listaPokemons"); // Busca o elemento com id "listaPokemons"
const textoStatus = document.getElementById("texto-status"); // Texto adicionado à página
const btnBuscar = document.getElementById("btnBuscar"); // Busca o elemento com id "btnBuscar"
const cardHolder = document.getElementById("cardHolder"); // Busca o elemento com id "cardHolder"

let pokemonEscolhido = null; // Inicializa a variável que receberá o Pokémon escolhido pelo usuário

const LIMITE_POKEMONS = 151; // Limite de Pokémons buscados pela API

async function ListaPokemons() {
    textoStatus.innerHTML = `<p>Selecione um Pokémon!</p>`;
    try {
        const resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151') // Busca os nomes dos primeiros 151 pokemóns
        let dados = await resposta.json(); // Converte o resultado da busca em JSON, para trabalho
        carregarLista(dados.results); // Chama a função que carrega a lista para seleção do usuário
    } catch (erro) {
        textoStatus.innerHTML = `<p class="status-message">Erro! ${erro.message}</p>`; // Imprime na tela a mensagem de erro, caso ocorra
    }
}

function carregarLista(pokemons) { // Função que carrega a lista de Pokémons
    listaPokemons.innerHTML = pokemons.map(poke =>
        `<option value="${poke.name}">${poke.name.toUpperCase()}</option>`
    ).join(''); // Mapeia a lista retornada um texto HTML com cada opção, passando os caracteres dos nomes para maiúsculo
}

async function botaoClicar() { // Função executada ao clicar no botão
    const pokemonSelecionado = listaPokemons.value.toLowerCase(); // Captura o Pokémon selecionado na lista
    try {
        const respostaPokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSelecionado}`) // Realiza a busca pelo Pokémon selecionado
        let dadosPokemon = await respostaPokemon.json(); // Passa a resposta para JSON, para trabalho
        cardPokemon(dadosPokemon) // Invoca a função de criação do Card com as informações
    } catch (erro) {
        textoStatus.innerHTML = `<p class="status-message">Erro! ${erro.message}</p>`; // Imprime erro na tela, caso ocorra
    }
}

function cardPokemon(pokemon) { // Função que popula o Card
    let nome = pokemon.name; // Coleta o nome
    let img = pokemon.sprites["front_default"]; // Coleta a URL da imagem
    let alturaResposta = pokemon.height*0.1; // Coleta a altura e converte para m
    let altura = alturaResposta.toFixed(1); // Arredonda a altura para uma casa decimal
    let pesoResposta = pokemon.weight*0.1; // Coleta o peso e converte para kg
    let peso = pesoResposta.toFixed(1); // Arredonda o peso para uma casa decimal
    let listaHabilidades = pokemon.abilities.map (item => item.ability.name).join(', '); // Cria uma string com os nomes das Habilidades 
    let listaTipos = pokemon.types.map (item => item.type.name).join(', '); // Cria uma string com os nomes dos tipos

    // Adiciona os elementos HTML do Card no elemento cardHolder
    cardHolder.innerHTML = `
        <div id="card-pokemon">
            <h2>${nome.toUpperCase()}</h2>
            <img src="${img}" alt="${nome.toUpperCase()}" id="imagem-card">
            <div id="infos-pokemon">
                <p id="stats-pokemon">Altura: ${altura} m</p>
                <p id="stats-pokemon">Peso: ${peso} kg</p>
                <p id="stats-pokemon">Habilidades: ${listaHabilidades}</p>
                <p id="stats-pokemon">Tipos: ${listaTipos}</p>
            </div>
        </div>
    `;
}

btnBuscar.addEventListener('click', botaoClicar); // Adiciona um leitor de evento para o clique no botão
ListaPokemons(); // Chama a função de criar a lista de Pokémons
