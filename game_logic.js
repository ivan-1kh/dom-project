const tileClickEventHandler = (target) => {};

function randomizeGameBoard(columns , rows) {
  const images = Array.from({ length: columns*rows }, (_, i) => `image${i + 1}.jpeg`);

  // shuffle function
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledImages = shuffleArray(images);

  let matrix = [];
  for (let i = 0; i < columns; i++) {
    matrix.push([]);
    for (let j = 0; j < rows; j++) {
        matrix[i][j] = shuffledImages[i * columns + j];
    }
  }

  return matrix;
}

const x_dim = 5,
  y_dim = 6;

const gameContainer = document.querySelector("#gameContainer");

let newColumn;
let newTile;

let tileBoard = randomizeGameBoard(x_dim , y_dim);

for (let i = 0; i < x_dim; i++) {
  newColumn = document.createElement("div");

  newColumn.className = "columnContainer";

  for (let j = 0; j < y_dim; j++) {
    newTile = document.createElement("h1");
    newTile.textContent = tileBoard[i][j];

    // newTile = document.createElement("img");

    newTile.className = "tileItem";

    // randomize number from 0 (or 1?) to the number of tiles we have (images)
    // and so pick that one (associate it with the tile)

    newTile.onclick = tileClickEventHandler;

    newColumn.appendChild(newTile);
  }

  gameContainer.appendChild(newColumn);
}
