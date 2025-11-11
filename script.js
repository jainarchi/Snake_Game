let board = document.getElementById("s2");

let cellWidth = 80;
let cellHeight = 80;

let row = Math.floor(board.clientHeight / cellHeight);
let col = Math.floor(board.clientWidth / cellWidth);



for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    
    let cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
  }
}
