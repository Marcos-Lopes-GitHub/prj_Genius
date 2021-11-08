let order = [];
let clickedOrder = [];
let score = 0;

//0 - verde
//1 - vermelho
//2 - amarelo
//3 - azul
//
//

const audioGreen  = new Audio('./beep-02.wav');
const audioBlue   = new Audio('./beep-03.wav');
const audioRed    = new Audio('./beep-10.wav');
const audioYellow = new Audio('./beep-07a.wav');

const blue = document.querySelector('.blue');
const red  = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

//criar um função para sortear ao ordem
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4); 
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order){
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a próxima cor
let lightColor = (element, number) =>{
    number = number * 500;
    setTimeout(()=> {
      element.classList.add('selected');   

        // order.map(function(item){
            // console.log(item)
            // playSound(item)
        // });
        console.log(order)
        playSound(order[order.length-1])
        

    }, number - 250);
    setTimeout(()=>{
        element.classList.remove('selected');
    },number - 50);
}

// checa se os botões clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder){
        if(clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
    }

    if(clickedOrder.length === order.length){
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando um novo nível!`);
        nextLevel();
    }
}

// Função para o click do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250)
}

//função que retorna a cor
//
let createColorElement = (color) => {
    if(color == 0){
        return green;
    } else if(color == 1) {
        return red;
    } else if(color == 2) {
        return yellow;
    } else if(color == 3) {
        return blue;
    }
}

// Função para o próximo nível do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

// Função para game over
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para inicia um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

//Função de início do jogo
let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando um novo jogo!');
    score = 0;  
    nextLevel();
}

let playSound = (value) =>{
    if(value == 0){
        audioGreen.play();
    } else if(value == 1) {
       audioRed.play();
    } else if(value == 2) {
        audioYellow.play();
    } else if(value == 3) {
        audioBlue.play();
    }
}
//Evento de clique para as cores
green.onclick = () =>{
    click(0);
    playSound(0);
}

red.onclick = () =>{
    click(1);
    playSound(1);
}

yellow.onclick = () =>{
    click(2);
    playSound(2);
}

blue.onclick = () => {
    click(3);
    playSound(3);
}


//Início do jogo
playGame();
