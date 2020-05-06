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

function holdShip(event) {
    activeShip.id = event.target.id;
    activeShip.index = ships.findIndex(ships => ships.name == event.target.id);
    document.addEventListener('mouseup', dropShip);
    document.addEventListener('mousemove', dragShip);
    document.getElementById(activeShip.id).classList.add("held");

    shipCopy = document.getElementById(activeShip.id).cloneNode(true);
    shipCopy.classList.remove("held");
    shipCopy.style.position = "absolute";
    shipCopy.style.zIndex = 999;
    shipCopy.style.margin = 0;
    console.log(shipCopy);
    document.body.appendChild(shipCopy);
    moveShip(event);

    function dropShip(event) {
        console.log(shipCopy);
        document.getElementById(activeShip.id).classList.remove("held");
        document.removeEventListener('mouseup', dropShip);
        document.removeEventListener('mousemove', dragShip);
        shipCopy.remove();
        activeShip.index = activeShip.id = "";
    }

    function dragShip(event) {
        moveShip(event);
    }

    function moveShip(event) {
        shipCopy.style.left = event.pageX - shipCopy.offsetWidth / 2 + "px";
        shipCopy.style.top = event.pageY - shipCopy.offsetHeight / 2 + "px";
    }
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
