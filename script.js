let board = document.getElementById("s2");
let startBtn = document.querySelector(".startBtn");
let startGame = document.querySelector(".startGame");
let overGame = document.querySelector(".overGame");
let restartBtn = document.querySelector(".restartBtn");
let gameBtns = document.querySelectorAll('#game-btn button')

let timeInterval = null;
let interval = null;
let food = null;
let dir = "null";

let showScore = document.getElementById("score");
let showHighScore = document.getElementById("highScore");
let showTime = document.getElementById("time");

let highScore = parseInt(localStorage.getItem("highScore")) || 0;
let score = 0;
let time = `00-00`;

let cellWidth = 80;
let cellHeight = 80;
let row = 0;
let col = 0;

let mediaQuery = window.matchMedia("(max-width: 650px)");

function updateCellDimensions(mql) {
  if (mql.matches) {
    cellWidth = 60;
    cellHeight = 60;
  } else {
    cellWidth = 80;
    cellHeight = 80;
  }

  row = Math.floor(board.clientHeight / cellHeight);
  col = Math.floor(board.clientWidth / cellWidth);

  console.log(`Dimensions: ${cellWidth}x${cellHeight}. Grid: ${row}x${col}`
  );
}

updateCellDimensions(mediaQuery);
mediaQuery.addEventListener("change", updateCellDimensions);

const blocks = [];
let snake = [{ x: 1, y: 3 }];

for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
    blocks[`${i}-${j}`] = cell;
  }
}


function randomFood() {
  food = {
    x: Math.floor(Math.random() * row),
    y: Math.floor(Math.random() * col),
  };
  blocks[`${food.x}-${food.y}`].classList.add("food");
}

function render() {
  snake.forEach((segment) => {
    let c = blocks[`${segment.x}-${segment.y}`];
    c.classList.add("fill");
  });
}

function run() {
  interval = setInterval(() => {

    let newHead = {...snake[0]};
    if(dir === "ArrowRight") newHead.y +=1 ;
    else if (dir === "ArrowLeft") newHead.y -=1;
    else if (dir === "ArrowUp") newHead.x -= 1;
    else if (dir === "ArrowDown") newHead.x +=1 ;

    if(newHead.x < 0 || newHead.x >= row ||
      newHead.y < 0 || newHead.y >= col  || 
      snake.some((obj , idx) => obj.x === newHead.x && obj.y === newHead.y )){

        overGame.style.display = "flex";
        clearInterval(interval);
        return;    
      }
        
      snake.unshift(newHead);
      blocks[`${newHead.x}-${newHead.y}`].classList.add("fill");
    
      
     if(newHead.x === food.x && newHead.y === food.y){
      blocks[`${food.x}-${food.y}`].classList.remove("food");
      randomFood();

      
      // snake.unshift(newHead);
      score += 10 ;
      showScore.textContent = score;

      if(highScore < score){
        highScore = score ;
        showHighScore.textContent = highScore ;

        localStorage.setItem("highScore" , highScore);
      }
    }
     else {
      let tail = snake.pop();
      blocks[`${tail.x}-${tail.y}`].classList.remove("fill");
      
     }
      
    
      
    
  }, 400);
}


// start

startBtn.addEventListener("click", () => {

  startGame.style.display = "none";
  showHighScore.textContent = highScore;

  clearInterval(timeInterval)

  timeInterval = setInterval(() => {
    let [min, sec] = time.split("-").map(Number);

    if (sec === 59) {
      min += 1;
      sec = 0;
    } else {
      sec += 1;
    }
    
    min = (min < 10) ? '0' + min : min
    sec = (sec < 10 )? '0' + sec : sec
    time = `${min}-${sec}`;
    showTime.textContent = time;
  }, 1000);

  randomFood();        // for intial food
  render();
});


function setDirection(inputDir) {
  let validDir = ['ArrowRight', 'ArrowDown', 'ArrowUp', 'ArrowLeft']

  if (validDir.includes(inputDir)) {
    dir = inputDir

    if (interval === null) {   // otherwise dir already set
      run();
    }
  }
}


addEventListener("keydown", (e) => { setDirection(e.key) });


gameBtns.forEach((btn) => {
  btn.addEventListener("click", () => { setDirection(btn.id) })
})




restartBtn.addEventListener("click", () => {
  overGame.style.display = "none";

  snake.forEach((obj) => {
    blocks[`${obj.x}-${obj.y}`].classList.remove("fill");
  });
  blocks[`${food.x}-${food.y}`].classList.remove("food");

  dir = "null";
  interval = null;
  clearInterval(timeInterval)
  score = 0;
  time = `00-00`
  snake = [{ x: 1, y: 3 }];
 

  showScore.textContent = score;
  showTime.textContent = `00-00`

 
  startBtn.click()


});
