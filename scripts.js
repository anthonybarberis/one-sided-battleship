function init() {
    createGrid();
}

let ships = [
    {
        name: "Carrier",
        size: 5
    },
    {
        name: "Battleship",
        size: 4
    },
    {
        name: "Cruiser",
        size: 3
    },
    {
        name: "Submarine",
        size: 3
    },
    {
        name: "Destroyer",
        size: 2
    }
]

function createGrid() {
    let board = document.getElementById("board");

    let rowLabels = "ABCDEFGHIJ"

    for (columns = 0; columns < 10; columns++) {
        let row = rowLabels.slice(columns, columns + 1)
        for (rows = 0; rows < 10; rows++) {

            //create square node
            let square = document.createElement("div");
            square.className += "square";
            square.textContent = square.id = row + (rows + 1);

            //create squares
            board.appendChild(square);
        }
    }
}

function createShips() {

}

/*
function addDrags() {
    let ships = document.getElementsByClassName("ship");
    for (i = 0; i < ships.length; i++) {
        console.log(ships[i]);
        ships[i].setAttribute("draggable", "true");
    }
}
*/

window.onload = init;