console.log("Welcome to Tic Tac Toe");

let music = new Audio("./assets/music.mp3");
let audioTurn = new Audio("./assets/ting.mp3");
let gameover = new Audio("./assets/gameover.mp3");
let isgameover = false;
let turn = "X";
let isMusicPlaying = true; 

const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}


const startMusic = () => {
    music.loop = true; // Set to loop continuously
    music.play();
    isMusicPlaying = true; 
}


const stopMusic = () => {
    music.pause();
    isMusicPlaying = false; 
}

const toggleMusic = () => {
    if (isMusicPlaying) {
        stopMusic();
        stopMusicButton.innerText = "Play Music"; // Update button text
    } else {
        startMusic();
        stopMusicButton.innerText = "Stop Music"; // Update button text
    }
}


// Function to check win
const checkWin = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) &&
            (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) &&
            (boxtexts[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " Won";
            isgameover = true;
            document.querySelector('.imagebox').getElementsByTagName('img')[0].style.width = "200px";
        }
    });
}

// startMusic();

// Game Logic

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();

            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
            }
        }
    });
});

// Add onclick listener to reset button
let reset = document.getElementsByClassName('reset')[0];
reset.addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isgameover = false;
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imagebox').getElementsByTagName('img')[0].style.width = "0px";
    startMusic();
    stopMusicButton.innerText = "Stop Music";
});


// Select the stop music button and add toggle functionality
const stopMusicButton = document.querySelector(".stop-music");
stopMusicButton.addEventListener("click", toggleMusic);
