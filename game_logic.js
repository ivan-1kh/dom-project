
const tileClickEventHandler = (target) => {

    
}




const x_dim = 5, y_dim = 6

const gameContainer = document.querySelector("#gameContainer");

let newColumn;
let newTile;

for (let i = 0; i < x_dim; i++) {
    
    newColumn = document.createElement("div");

    newColumn.className = "columnContainer"

    for (let j = 0; j < y_dim; j++) {

        newTile = document.createElement("h1");
        newTile.textContent = "edfwsg"

        // newTile = document.createElement("img");

        newTile.className = "tileItem"

        // randomize number from 0 (or 1?) to the number of tiles we have (images)
        // and so pick that one (associate it with the tile)
        
        newTile.onclick = tileClickEventHandler;

        newColumn.appendChild(newTile);
    }

    gameContainer.appendChild(newColumn);
}
