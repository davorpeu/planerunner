// Define the list of planes
const planes = [
  "Alara",
  "Arkhos",
  "Bolas's Meditation Realm",
  "Dominaria",
  "Equilor",
  "Ir",
  "Iquatana",
  "Kaldheim",
  "Kamigawa",
  "Karsus",
  "Kinshala",
  "Lorwyn",
  "Luvion",
  "Mercadia",
  "Mirrodin",
  "Moag",
  "Muraganda",
  "Phyrexia",
  "Pyrulea",
  "Rabiah",
  "Rath",
  "Ravnica",
  "Segovia",
  "Serra's Realm",
  "Shandalar",
  "Shadowmoor",
  "Ulgrotha",
  "Valla",
  "Wildfire",
  "Zendikar",
  "Azgol",
  "Belenon",
  "Ergamon",
  "Fabacin",
  "Innistrad",
  "Kephalai",
  "Kolbahan",
  "Kyneth",
  "Mongseng",
  "New Phyrexia",
  "Regatha",
  "Vryn",
  "Xerex",
  "Capenna",
  "Echoir",
  "Ixalan",
  "Tarkir",
  "Cridhe",
  "Ikoria",
  "Gargantikar",
  "Amonkhet",
  "Fiora",
  "The Abyss",
  "Theros",
  "Shenmeng",
  "Zhalfir",
  "Arcavios",
  "Kylem",
  "Gobakhan",
  "Eldraine",
];

// Shuffle the list of planes
shuffleArray(planes);

// Create the game board
const board = document.querySelector(".board");

// Add event listener to handle tile placement using event delegation
board.addEventListener("click", handleTilePlacement);

// Initialize an empty array to represent the game board state
let gameBoardState = [];

// Function to handle tile placement
function handleTilePlacement(event) {
  const tile = event.target.closest(".tile");

  // Check if the clicked element is a tile
  if (tile && tile.textContent === "") {
    const row = tile.dataset.row;
    const col = tile.dataset.col;

    console.log("Clicked tile:", tile);
    console.log("Row:", row, "Column:", col);

    // Check if the tile can be placed adjacent to an existing active plane
    if (isAdjacentToActivePlane(row, col)) {
      console.log("Adjacent to active plane.");

      const plane = planes.pop();
      console.log("Placing plane:", plane);

      // Update the tile with the plane name and mark it as active
      tile.textContent = plane;
      tile.classList.add("active");

      // Activate adjacent tiles
      activateAdjacentTiles(row, col);

      console.log("Game board state:", gameBoardState);
      confirm("Tile placement successful!");
    } else {
      console.log("Not adjacent to active plane.");
      confirm(
        "Tile placement failed. Tile must be adjacent to an active plane."
      );
    }
  } else if (tile && tile.textContent !== "") {
    console.log("Selected tile with plane:", tile);

    // Deactivate other active tiles
    deactivateAllTiles();
    tile.classList.add("active");

    console.log("Game board state:", gameBoardState);
    confirm("Tile selection successful!");
  }
}

// Function to check if a tile is adjacent to an existing active plane
function isAdjacentToActivePlane(row, col) {
  // Check horizontally and vertically adjacent tiles
  const adjacentCoords = [
    { row: parseInt(row) - 1, col: col },
    { row: parseInt(row) + 1, col: col },
    { row: row, col: parseInt(col) - 1 },
    { row: row, col: parseInt(col) + 1 },
  ];

  for (const coord of adjacentCoords) {
    const adjRow = coord.row;
    const adjCol = coord.col;

    // Check if the adjacent tile is within the board boundaries
    if (isValidCoord(adjRow, adjCol)) {
      // Check if the adjacent tile is active
      if (gameBoardState[adjRow][adjCol]) {
        return true;
      }
    }
  }

  return false;
}

// Function to activate adjacent tiles
function activateAdjacentTiles(row, col) {
  const adjacentCoords = [
    { row: parseInt(row) - 1, col: col },
    { row: parseInt(row) + 1, col: col },
    { row: row, col: parseInt(col) - 1 },
    { row: row, col: parseInt(col) + 1 },
  ];

  for (const coord of adjacentCoords) {
    const adjRow = coord.row;
    const adjCol = coord.col;

    // Check if the adjacent tile is within the board boundaries
    if (isValidCoord(adjRow, adjCol)) {
      const adjacentTile = document.querySelector(
        `.tile[data-row="${adjRow}"][data-col="${adjCol}"]`
      );

      // Check if the adjacent tile is empty
      if (adjacentTile && adjacentTile.textContent === "") {
        const plane = planes.pop();

        // Update the adjacent tile with the plane name and mark it as active
        adjacentTile.textContent = plane;
        adjacentTile.classList.add("active");

        // Update the game board state
        gameBoardState[adjRow][adjCol] = plane;
      }
    }
  }
}

// Function to deactivate all tiles
function deactivateAllTiles() {
  const tiles = document.querySelectorAll(".tile");

  for (const tile of tiles) {
    tile.classList.remove("active");
  }
}

// Function to check if a coordinate is valid within the board boundaries
function isValidCoord(row, col) {
  const rowCount = gameBoardState.length;
  const colCount = rowCount > 0 ? gameBoardState[0].length : 0;

  return row >= 0 && row < rowCount && col >= 0 && col < colCount;
}

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Initialize the game board
initializeGameBoard();

// Function to initialize the game board
function initializeGameBoard() {
  const boardSize = 10;

  // Create the empty game board state
  gameBoardState = Array.from({ length: boardSize }, () =>
    Array(boardSize).fill("")
  );

  // Clear the board
  board.innerHTML = "";

  // Create the tiles and append them to the board
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.row = row;
      tile.dataset.col = col;

      board.appendChild(tile);
    }
  }

  // Select a random tile for the initial active plane
  const initialTile = getRandomTile();
  const initialRow = initialTile.dataset.row;
  const initialCol = initialTile.dataset.col;

  // Place the initial active plane on the random tile
  const initialPlane = planes.pop();
  initialTile.textContent = initialPlane;
  initialTile.classList.add("active");
  gameBoardState[initialRow][initialCol] = initialPlane;

  console.log("Initial active plane:", initialPlane);
  console.log("Game board state:", gameBoardState);
}

// Function to select a random tile on the board
function getRandomTile() {
  const tiles = document.querySelectorAll(".tile");
  const randomIndex = Math.floor(Math.random() * tiles.length);
  return tiles[randomIndex];
}
