const openModalButtons = document.querySelectorAll('[data-modal-target]');
const closeModalButtons = document.querySelectorAll('[data-close-button]');
const overlay = document.getElementById('overlay');

const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add('active');
    overlay.classList.add('active');
};

const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
};


openModalButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
    });
});

overlay .addEventListener('click', () =>{
    const modals = document.querySelectorAll('.modal.active');
    modals. forEach(modal =>{
        closeModal(modal);

    });
});

closeModalButtons.forEach(button => {
    button.addEventListener('click', () =>{
        const modal = button.closest('.modal');
        closeModal(modal);
    });
});

let order = [];
let playerOrder =[];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const redbutton = document.querySelector(".red-btn");
const greenbutton = document.querySelector(".green-btn");
const bluebutton= document.querySelector(".blue-btn");
const yellowbutton = document.querySelector(".yellow-btn");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

strictButton.addEventListener('click', (event) =>{
    if (strictButton.checked == true) {
        strict = true;
    } else{
        strict = false;
    };
});

onButton.addEventListener('click', (event) =>{
    if (onButton.checked == true) {
        on = true;
        turnCounter.innerHTML = "-";
    } else{  
        on= false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
    };
});

startButton.addEventListener('click', (event) =>{
    if(on || win){
        play();
    };
});

function play(){
    win = false;
    order = [];
    playerOrder = [];
    flash = 0;
    intervalId =0;
    turn = 1;
    turnCounter.innerHTML =1;
    good = true;
    for (var i = 0; i < 20; i++){
        order.push(Math.floor(Math.random() * 4) + 1);
    };
    compTurn = true;

    intervalId = setInterval(gameTurn, 800);
};

function gameTurn(){
    on = false;

    if (flash == turn){
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        on = true;
    }

    if (compTurn){
        clearColor();
        setTimeout(() => {
            if (order[flash] == 1) one();
            if (order[flash] == 2) two();
            if (order[flash] == 3) three();
            if (order[flash] == 4) four();
            flash++;
        }, 200);
    }
}


function one(){
    if(noise){
        let audio = document.getElementById("clip1");
        audio.play();
    };
    noise = true;
    redbutton.style.backgroundColor = "tomato";
};

function two(){
    if(noise){
        let audio = document.getElementById("clip2");
        audio.play();
    };
    noise = true;
    greenbutton.style.backgroundColor = "lightgreen";
};

function three(){
    if(noise){
        let audio = document.getElementById("clip3");
        audio.play();
    };
    noise = true;
    bluebutton.style.backgroundColor = "lightblue";
};

function four(){
    if(noise){
        let audio = document.getElementById("clip4");
        audio.play();
    };
    noise = true;
    yellowbutton.style.backgroundColor = "lightyellow";
};

function clearColor(){
    redbutton.style.backgroundColor = "red";
    greenbutton.style.backgroundColor = "green";
    bluebutton.style.backgroundColor = "blue";
    yellowbutton.style.backgroundColor = "yellow";
};

function flashColor(){
    redbutton.style.backgroundColor = "tomato";
    greenbutton.style.backgroundColor = "lightgreen";
    bluebutton.style.backgroundColor = "lightblue";
    yellowbutton.style.backgroundColor = "lightyellow";
};

redbutton.addEventListener("click", (event) => {
    if (on) {
        playerOrder.push(1);
        check();
        one();
        if (!win) {
            setTimeout(() =>{
                clearColor();
            }, 300);
        }
    }
});

greenbutton.addEventListener("click", (event) => {
    if (on) {
        playerOrder.push(2);
        check();
        two();
        if (!win) {
            setTimeout(() =>{
                clearColor();
            }, 300);
        }
    }
});

bluebutton.addEventListener("click", (event) => {
    if (on) {
        playerOrder.push(3);
        check();
        three();
        if (!win) {
            setTimeout(() =>{
                clearColor();
            }, 300);
        }
    }
});

yellowbutton.addEventListener("click", (event) => {
    if (on) {
        playerOrder.push(4);
        check();
        four();
        if (!win) {
            setTimeout(() =>{
                clearColor();
            }, 300);
        }
    }
});

function check(){
    if (playerOrder[playerOrder.length - 1] !== order[playerOrder.length -1]) good = false;
    if(playerOrder.length == 20 && good) {
        winGame();
    }
    if (good == false){
        turnCounter.innerHTML = "NO!";
        setTimeout(() =>{
            turnCounter.innerHTML = turn;
            clearColor();

            if(strict){
                play();
            }else{
                compTurn = true;
                flash = 0;
                playerOrder = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            }
        }, 800);
        noise = false;
    }
    if (turn == playerOrder.length && good &&!win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800)
    }
}

function winGame(){
    flashColor();
    turnCounter.innerHTML = "WIN!";
    on = false;
    win = true;
}
