function init() {
    createGrid();
    measureGrid();
    createShips();
    resizeShips();
}

let ships = [{
        name: "Carrier",
        size: 5,
        placement: []
    },
    {
        name: "Battleship",
        size: 4,
        placement: []
    },
    {
        name: "Cruiser",
        size: 3,
        placement: []
    },
    {
        name: "Submarine",
        size: 3,
        placement: []
    },
    {
        name: "Destroyer",
        size: 2,
        placement: []
    }
]

let grid = [];

let gridSize = {};

let rotation = 'horizontal';

let activeShip = {
    id: "",
    index: ""
}

function createGrid() {
    let board = document.getElementById("board");
    let rowLabels = "ABCDEFGHIJ"

    for (columns = 0; columns < 10; columns++) {
        let row = rowLabels.slice(columns, columns + 1)
        for (rows = 0; rows < 10; rows++) {

            //create square
            let square = document.createElement("div");
            square.className += "square";
            square.textContent = square.id = row + (rows + 1);
            board.appendChild(square);
        }
    }
}

function measureGrid() {
    let squares = document.getElementsByClassName("square");
    for (i = 0; i < squares.length; i++) {
        grid[i] = {
            id: squares[i].id,
            boundingClientRect: squares[i].getBoundingClientRect()
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
        ship.setAttribute("onmousedown", "holdShip(event)");

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
        switch (rotation) {
            case 'horizontal':
                extantShips[i].style.width = `${ships[i].size * gridSize.offset}px`;
                extantShips[i].style.height = `${gridSize.offset}px`;
                extantShips[i].style['writing-mode'] = "initial";
                break;
            case 'vertical':
                extantShips[i].style.width = `${gridSize.offset}px`;
                extantShips[i].style.height = `${ships[i].size * gridSize.offset}px`;
                extantShips[i].style['writing-mode'] = "vertical-rl";
                break;
        }
    }
}

//starts the process of moving a ship after mousedown
function holdShip(event) {
    activeShip.id = event.target.id;
    activeShip.index = ships.findIndex(ships => ships.name == event.target.id);
    document.addEventListener('mouseup', dropShip);
    document.addEventListener('mousemove', moveShip);
    document.getElementById(activeShip.id).classList.add("held");

    shipCopy = document.getElementById(activeShip.id).cloneNode(true);
    shipCopy.classList.remove("held");
    shipCopy.style.position = "absolute";
    shipCopy.style.zIndex = 999;
    shipCopy.style.margin = 0;
    shipCopy.style.opacity = "85%";
    document.body.appendChild(shipCopy);
    moveShip(event);
}

function dropShip() {
    document.getElementById(activeShip.id).classList.remove("held");
    document.removeEventListener('mouseup', dropShip);
    document.removeEventListener('mousemove', moveShip);

    if (ships[activeShip.index].placement.length == ships[activeShip.index].size) {
        placedShip = shipCopy.cloneNode(true);
        document.getElementById(activeShip.id).remove();
        document.body.appendChild(placedShip);

    }

    //clean up the moving ship
    shipCopy.remove();
    activeShip.index = activeShip.id = "";
    Array.from(document.getElementsByClassName('square')).forEach(element => element.classList.remove("overlap"));
}

function moveShip(event) {
    //move the ship
    shipCopy.style.left = event.pageX - shipCopy.offsetWidth / 2 + "px";
    shipCopy.style.top = event.pageY - shipCopy.offsetHeight / 2 + "px";

    //measure the position of the ship
    ships[activeShip.index].boundingClientRect = shipCopy.getBoundingClientRect();

    //compare the position of the ship to every grid square to find overlap
    let overlapSquares = [];
    for (i = 0; i < grid.length; i++) {
        if (!(
                (grid[i].boundingClientRect.right - grid[i].boundingClientRect.width / 2) < ships[activeShip.index].boundingClientRect.left ||
                (grid[i].boundingClientRect.left + grid[i].boundingClientRect.width / 2) > ships[activeShip.index].boundingClientRect.right ||
                (grid[i].boundingClientRect.bottom - grid[i].boundingClientRect.height / 2) < ships[activeShip.index].boundingClientRect.top ||
                (grid[i].boundingClientRect.top + grid[i].boundingClientRect.height / 2) > ships[activeShip.index].boundingClientRect.bottom
            )) {
            overlapSquares.push(grid[i].id);
        } else {
            document.getElementById(grid[i].id).classList.remove("overlap");
        }
    }
    //if overlap matched ship size, record the placement and style the grid
    if (overlapSquares.length == ships[activeShip.index].size) {
        ships[activeShip.index].placement = overlapSquares;
        overlapSquares.forEach(element => document.getElementById(element).classList.add("overlap"))
    }
}

window.onload = init;

window.addEventListener('resize', function () {
    resizeShips();
    measureGrid();
})

//listen for "r" to rotate ships
document.addEventListener('keydown', function (event) {
    if (event.code == 'KeyR') {
        if (rotation == 'horizontal') {
            rotation = 'vertical';
        } else {
            rotation = 'horizontal';
        }
        resizeShips();
    }
})