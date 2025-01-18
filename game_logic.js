
// Gameboard's dimensions
const x_dim = 5, y_dim = 6;

// DOM Elements
const gameContainer = document.querySelector("#gameContainer");
const movesLabel = document.querySelector("#movesLabel");
const matchesLabel = document.querySelector("#matchesLabel");
const randomThemeButton = document.querySelector("#randomThemeButton");
const catsThemeButton = document.querySelector("#catsThemeButton");
const pokemonThemeButton = document.querySelector("#pokemonThemeButton");

// Game variables
let gameBoard;
let gameTheme;
let moves, matches;
let selectedTile = null;
let activeDelay = false;


// Adds move and updates the DOM
const addMove = () => {

    moves++;

    movesLabel.textContent = "Moves: " + moves;
};

// Adds match and updates the DOM
const addMatch = () => {

    matches++;

    matchesLabel.textContent = "Matches: " + matches;
};

// Event handler for when the user clicks an image (tile) during the game
const tileClickEventHandler = (target) => {

    // check if revelaed already. if yes, return without doing anything
    if (!target.element.firstChild.hidden || activeDelay) return;
    
    addMove();

    target.element.firstChild.hidden = null;

    // Checks if this is the second tile selected or not
    if (selectedTile) {

        // Checks if the images match up
        if (Math.abs(selectedTile.id - target.id) == 15) {

            //match!
            addMatch();
            selectedTile = null;

            if (matches == x_dim * y_dim / 2) {

                setTimeout(() => {

                    alert("Game won!");

                }, 500);
            }

        } else {
            
            //no match
            activeDelay = true;

            // Flips the tile back because they aren't matched
            setTimeout(((element1, element2) => {
                
                element1.hidden = "true";
                element2.hidden = "true";
                selectedTile = null;

                activeDelay = false; //makes other tiles clickable again

            }).bind(null, selectedTile.element.firstChild, target.element.firstChild), 1000);
        }

    } else {

        // Makes the first tile selection for later comparison
        selectedTile = target;
    }
};

// Generates a new game board (random matrix corresponding to the images)
const randomizeGameBoard = () => {

    gameBoard = []; //reset game board

    // Creates an array with numbers from 1 to 30
    const numbers = Array.from({ length: 30 - 1 + 1 }, (_, i) => i + 1);
    
    // Shuffles the array using Fisher-Yates shuffle
    for (let i = numbers.length - 1; i > 0; i--) {
        
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    let tempArr = [];

    // Populates the matrix by splitting the shuffled array
    for (let i = 0; i < x_dim; i++) {

        gameBoard.push(numbers.slice(i * y_dim, i * y_dim + y_dim));
    }

    // Creates new HTML elements
    let newColumn, newTile;

    // Loops over every cell (tile) in the matrix (game board)
    for (let i = 0; i < x_dim; i++) {
        
        // Creates new column for the board
        newColumn = document.createElement("div");

        newColumn.className = "columnContainer";

        // Populates the column
        for (let j = 0; j < y_dim; j++) {

            // Creates the elements needed for each tile
            newTile = document.createElement("div");
            newImg = document.createElement("img");

            newTile.appendChild(newImg);

            newImg.hidden = "true";

            newImg.setAttribute("draggable", "false");
            newImg.setAttribute("oncontextmenu", "return false;");
            
            // Adds the unique ID for the image
            gameBoard[i][j] = {
                id: gameBoard[i][j],
                element: newTile
            }

            // Assigns the image to its element
            newImg.src = "./images/" + gameTheme + "/image" + gameBoard[i][j].id + ".jpeg";

            newTile.className = "tileItem";
            newImg.className = "imgItem";

            newTile.onclick = () => tileClickEventHandler(gameBoard[i][j]);

            newColumn.appendChild(newTile);
        }

        gameContainer.appendChild(newColumn);
    }
}

// Creates new game
const newGame = (theme) => {

    // Checks if a theme selection has been made
    if (theme) {

        // Reset theme
        randomThemeButton.className = "button themeButtonm";
        catsThemeButton.className = "button themeButtonm";
        pokemonThemeButton.className = "button themeButtonm";

        gameTheme = theme;

        // Assign theme:
        document.querySelector("#" + gameTheme + "ThemeButton").className = "button themeButtonm selectedThemeButton";    
    }

    // Resets moves and matches counters
    moves = 0;
    movesLabel.textContent = "Moves: " + moves;
    matches = 0;
    matchesLabel.textContent = "Matches: " + matches;

    // Resets board
    while (gameContainer.hasChildNodes()) {

        gameContainer.removeChild(gameContainer.firstChild);
    }

    // Re-generates board
    randomizeGameBoard();
}
