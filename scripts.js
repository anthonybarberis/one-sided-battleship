function init() {
    createGrid();
}

function createGrid() {
    var board = document.getElementById("board");

    for (squares=0; squares < 100; squares++) {
        var square = document.createElement("div")
        square.className += "square";
        board.appendChild(square);
    }
}

window.onload = init;