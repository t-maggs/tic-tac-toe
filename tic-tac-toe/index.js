var vals = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const playerSymbols = ['O', 'X'];
var currentPlayer = 0;

const elements = document.getElementsByClassName('gridbox');

document.getElementById('reset').addEventListener('click', resetGame);

for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', placeSymbol);
    elements[i].idx = i;
}

function placeSymbol(thisBox) {
    if (thisBox.currentTarget.isAlreadyPlayed == true) {
        return;
    }
    else {
        tile = document.createElement('h2');
        tile.innerText = playerSymbols[currentPlayer];
        thisBox.currentTarget.appendChild(tile);
        thisBox.currentTarget.isAlreadyPlayed = true;
        vals[thisBox.currentTarget.idx] = playerSymbols[currentPlayer];
        currentPlayer = (currentPlayer + 1) % 2;
        document.getElementById('turnIndicator').innerText = `Player ${playerSymbols[currentPlayer]}'s turn`
        checkGameStatus();
    }
}

function checkGameStatus() {
    if ((vals[0] == vals[1] && vals[0] == vals[2]) || (vals[3] == vals[4] && vals[3] == vals[5]) || (vals[6] == vals[7] && vals[6] == vals[8]) ||
    (vals[0] == vals[3] && vals[0] == vals[6]) || (vals[1] == vals[4] && vals[1] == vals[7]) || (vals[2] == vals[5] && vals[2] == vals[8]) ||
    (vals[0] == vals[4] && vals[0] == vals[8]) || (vals[2] == vals[4] && vals[2] == vals[6])) {
        document.getElementById('turnIndicator').innerText = `Player ${playerSymbols[(currentPlayer + 1) % 2]} won the game!`
        lockGame()
    }
    else if ((vals[0] != 1) && (vals[1] != 2) && (vals[2] != 3) && (vals[3] != 4) && (vals[4] != 5) && (vals[5] != 6) && (vals[6] != 7) && (vals[7] != 8) && (vals[8] != 9)) {
        document.getElementById('turnIndicator').innerText = "Draw! Reset the game to play again."
        lockGame()
    }
}

function lockGame() {
    for (let i = 0; i < elements.length; i++) {
        elements[i].removeEventListener('click', placeSymbol);
    }
}

function resetGame() {
    vals = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    currentPlayer = 0;
    for (let i = 0; i < elements.length; i++) {
        elements[i].isAlreadyPlayed = false
        elements[i].addEventListener('click', placeSymbol);
    }
    var textItems = document.getElementsByTagName('h2')
    for (let i = 0; i < textItems.length; i++) {
        textItems[i].innerText = '';
    }
    document.getElementById('turnIndicator').innerText = "Start new game: Player O's turn"
}