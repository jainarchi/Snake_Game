let board = document.getElementById("s2");

let cellWidth = 80;
let cellHeight = 80;

let row = Math.floor(board.clientHeight / cellHeight);
let col = Math.floor(board.clientWidth / cellWidth);

const blocks = []
const snake = [
  { x: 1 , y: 1 } ,
  { x: 1 , y: 2 } ,
  { x: 1 , y: 3 }
]


for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {

    let cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = `${i}  ${j}`
    board.appendChild(cell);
    blocks[`${i}-${j}`] = cell ;
  }
}


function render (){
     snake.forEach((segment) => {
        let c = blocks[`${segment.x}-${segment.y}`]
        c.classList.add("fill")
     })
}

let dir = 'right';


function run (){
  
 setInterval(() =>{
  let head = null ;
    if( dir === "right"  ){
      head  = { x : snake[0].x  , y : snake[0].y + 1 }
       
    }

    snake.unshift(head);
    blocks[`${head.x}-${head.y}`].classList.add("fill")
    
    let obj = snake.pop();
    blocks[`${obj.x}-${obj.y}`].classList.remove("fill")
    
   render()
   
 } , 400);
}


// run();






