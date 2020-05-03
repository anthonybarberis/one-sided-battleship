function init() {
    createGrid();
    createShips();
    resizeShips();

    window.onresize = resizeShips;
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

let gridSize = {}

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

            //create square
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
        ship.setAttribute("draggable", "true");

        //create ship
        tray.appendChild(ship);
    }
}

function resizeShips() {

    //measure the grid size
    let oneGrid = document.getElementsByClassName("square")[0];
    gridSize.offset = oneGrid.offsetHeight;
    gridSize.client = oneGrid.clientHeight;

    //apply the grid size to the ships
    let extantShips = document.getElementsByClassName("ship");
    for (i = 0; i < extantShips.length; i++) {
        extantShips[i].style.width = `${ships[i].size * gridSize.offset}px`;
        extantShips[i].style.height = `${gridSize.offset}px`;
    }
}

window.onload = init;