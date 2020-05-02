function init() {
    createGrid();
}

function createGrid() {
    var board = document.getElementById("board");

    //create the grid square template
    var square = document.createElement("div")

    //create the grid squares
    for (squares=0; squares < 100; squares++) {
        console.log(squares+1)
    }
}

window.onload = init;