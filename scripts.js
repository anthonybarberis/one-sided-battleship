function init() {
    createGrid();
}

function createGrid() {
    let board = document.getElementById("board");

    for (squares=0; squares < 100; squares++) {
        
        //create square node
        let square = document.createElement("div");
        square.className += "square";
        square.textContent = "A1"
        
        //create squares
        board.appendChild(square);
    }
}

window.onload = init;