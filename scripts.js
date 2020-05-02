function init() {
    createGrid();
}

function createGrid() {
    var board = document.getElementById("board");

    for (squares=0; squares < 100; squares++) {
        //create grid label node
        var gridLabel = document.createElement("span");
        gridLabel.className += "gridLabel";
        gridLabel.textContent = "A1";
        
        //create square node
        var square = document.createElement("div");
        square.className += "square";
        square.textContent = "A1"
        
        //create squares
        board.appendChild(square);
    }
}

window.onload = init;