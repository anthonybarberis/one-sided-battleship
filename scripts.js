function init() {
    createGrid();
    createShips();
    resizeShips();
}

let ships = [{
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

            //create square node
            let square = document.createElement("div");
            square.className += "square";
            square.textContent = square.id = row + (rows + 1);
            square.setAttribute("ondragover", "allowDropShip(event)");
            square.setAttribute("ondrop", "dropShip(event)");

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
        //ship.setAttribute("ondragstart", "dragShip(event)"); deprecated, to remove
        ship.setAttribute("onmousedown", "clickShip(event)");

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

/*deprecated for clickShip
function dragShip(event) {
    //console.log(activeShip);
    //console.log(event);
}
*/

function clickShip(event) {
    activeShip.name = event.target.id;
    activeShip.index = ships.findIndex(ships => ships.name == event.target.id);
    //console.log(event);
}

function allowDropShip() {
    event.preventDefault();
}

function dropShip(event) {
    event.preventDefault();
    ships[activeShip.index].square = event.target.id; //find the index of the active ship and save the square location to it
    //console.log(ships);
    //console.log(event);
}

window.onload = init;

window.onresize = resizeShips;

//listen for "r" to rotate ships
document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyR') {
        if (rotation == 'horizontal') {
            rotation = 'vertical';
        } else {
            rotation = 'horizontal';
        }
        resizeShips();
    }
})
