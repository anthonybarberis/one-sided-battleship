function init() {
    createGrid();
    addDrags();
}

var ships 
function createGrid() {
    let board = document.getElementById("board");

    let rowLabels = "ABCDEFGHIJ"

    for (columns = 0; columns < 10; columns++) {
        let row = rowLabels.slice(columns, columns + 1)
        for (rows = 0; rows < 10; rows++) {

            //create square node
            let square = document.createElement("div");
            square.className += "square";
            square.textContent = square.id = row + (rows+1);

            //create squares
            board.appendChild(square);
        }
    }
}

function addDrags() {
    ships = document.getElementsByClassName("ship");
    for (i = 0; i < ships.length; i++) {
        console.log(ships[i]);
        ships[i].setAttribute("draggable", "true");
    }
}

window.onload = init;