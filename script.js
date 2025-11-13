let board = document.getElementById("s2");
let startBtn = document.querySelector(".startBtn")
let startGame = document.querySelector(".startGame")
let overGame = document.querySelector(".overGame")
let restartBtn = document.querySelector(".restartBtn")

let cellWidth = 80;
let cellHeight = 80;
let row = Math.floor(board.clientHeight / cellHeight);
let col = Math.floor(board.clientWidth / cellWidth);

let interval = null;
let food = null;

const blocks = [];
let snake = [{ x: 1, y: 3 }];

for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    let cell = document.createElement("div");
    cell.classList.add("cell");
    // cell.textContent = `${i}  ${j}`;
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
    let head = snake[0];

    if (head.x < 0 || head.x === row || head.y < 0 || head.y === col) {
      overGame.style.display = "flex"
      clearInterval(interval);
      return;
    } 
    else {
      if (dir === "ArrowRight") {
        head = { x: snake[0].x, y: snake[0].y + 1 };
      } else if (dir === "ArrowLeft") {
        head = { x: snake[0].x, y: snake[0].y - 1 };
      } else if (dir === "ArrowUp") {
        head = { x: snake[0].x - 1, y: snake[0].y };
      } else if (dir === "ArrowDown") {
        head = { x: snake[0].x + 1, y: snake[0].y };
      }

      if (head.x === food.x && head.y === food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        randomFood();
        snake.unshift(head);
      }

      snake.unshift(head);
      blocks[`${head.x}-${head.y}`].classList.add("fill");

      let obj = snake.pop();
      blocks[`${obj.x}-${obj.y}`].classList.remove("fill");

      render();
    }
  }, 400);
}


startBtn.addEventListener("click" , () =>{
    startGame.style.display = "none"
})



let dir = "null";

randomFood(); // for intial food
render();  // for intial snake

addEventListener("keydown", (e) => {
  dir = e.key;
  if(interval === null){  // otherwise interval already set
     run();
  }
              
 
});


restartBtn.addEventListener("click" , () =>{
     overGame.style.display="none"
     
     snake.shift();
     
     snake.forEach((obj)=>{
       console.log(obj);
       blocks[`${obj.x}-${obj.y}`].classList.remove("fill");
     })
      blocks[`${food.x}-${food.y}`].classList.remove("food");

     dir = "null";
     interval = null;


     snake = [{ x: 1, y: 3 }]
     render()
     randomFood();
     
})
