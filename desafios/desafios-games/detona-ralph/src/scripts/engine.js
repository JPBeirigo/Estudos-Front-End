const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
    },

    values: {
        timerId: null,
        countDownTimerId: setInterval(countDown, 1000),
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 6, 
        currentLives: 10,
        newGameVelocity: 600,
    },
};


function speedUp(newGameVelocity)
{ 
    state.values.gameVelocity = newGameVelocity;
    clearInterval(state.values.timerId);
    
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function playSound(audioName)
{
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 1;
    audio.play();
}

function countDown()
{
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 40){
        speedUp(800);
    }
    
    if(state.values.currentTime <= 30){
        speedUp(600);
    }
    
    if(state.values.currentTime <= 20){
        speedUp(400);
    }
    
    if(state.values.currentTime <= 0){
        clearInterval(state.values.countDownTimerId);
        clearInterval(state.values.timerId);
        
        alert("Game Over! Seu resultado foi: " + state.values.result);
    }
}





function randomSquare()
{
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;

    playSound("move");
}

function moveEnemy()
{
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox()
{
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
            else {
                playSound("hurt");
                state.values.currentLives--;
                state.view.lives.textContent = state.values.currentLives;
                if(state.values.currentLives <= 0)
                    {
                    clearInterval(state.values.countDownTimerId);
                    clearInterval(state.values.timerId);
                    
                    alert("Game Over! Seu resultado foi: " + state.values.result);
                    }
            }
        });
    });
}

function initialize()
{
    moveEnemy();
    addListenerHitBox();
}


initialize();