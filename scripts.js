function init() {
    createGrid();
    createShips();
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

            //create
            board.appendChild(square);
        }
    }
}

function createShips() {
    let tray = document.getElementById("tray");
    for (i = 0; i < ships.length; i++) {

        //create ship node
        let ship = document.createElement("div");
        ship.className += "ship";
        ship.textContent = ship.id = ships[i].name;

        //create ship
        tray.appendChild(ship);
    }
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