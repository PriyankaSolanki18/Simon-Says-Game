let gameSeq=[];
let userSeq=[];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;

// let highScore = localStorage.getItem("highScore") || 0; //loads the saved high score if it exists, otherwise starts from 0
let highScore = 0;

let h2 = document.querySelector("h2");
// h2.innerText = `High Score: ${highScore}`;
h2.innerText = `Press any key to start\nHigh Score: ${highScore}`;


document.addEventListener("keypress", function (){
    if(started == false){  // isse hamara game sirf ek hi baar start hoga
        console.log("Game Started...");
        started = true;

        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq=[]; // this is bcoz for every level user has to click again all the colors in the same sequence
    level++;
    // h2.innerText = `Level ${level}`;
    h2.innerText = `Level ${level} | High Score: ${highScore}`;

    //random btn choose
    let randIdx = Math.floor(Math.random()*3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    // console.log(randIdx);
    // console.log(randColor);
    // console.log(randBtn);

    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}

function checkAns(idx) {
    console.log("Current level :",level);

    // let idx = level-1;  // yaha per jolevel ki value h vo fixed value h 

    if(userSeq[idx] == gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        //Update High Score when game ends
        if(level > highScore){
            highScore = level;
            // localStorage.setItem("highScore", highScore);  // set highScore=0 for every page refresh without saving to local storage
        }

        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> High score: <b>${highScore}</b> <br> Press any key to start`;
       
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);

        reset();
    }

}

function btnPress() { //btn ko press kerne ke baad kya kaam hona chahiye vo is function me likhenge
    // console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}