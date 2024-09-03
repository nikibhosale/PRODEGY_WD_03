const humanPlayer = 'X';
const aiPlayer = 'O'; 
let currentPlayer;
let cells = document.querySelectorAll('.cell');
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let mode;

// Function to start the game
function startGame() {
  mode = document.querySelector('input[name="mode"]:checked').value;
  document.getElementById('modeSelection').style.display = 'none';
  document.getElementById('gameContainer').style.display = 'block';
  currentPlayer = humanPlayer;
  if (mode === 'ai' && currentPlayer === aiPlayer) {
    makeAiMove();
  }
}

// Function to reset the game
function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
  });
  gameOver = false;
  document.getElementById('status').textContent = '';
  document.getElementById('modeSelection').style.display = 'block';
  document.getElementById('gameContainer').style.display = 'none';
}

// Function to make a move
function makeMove(index) {
  if (!gameOver && board[index] === '') {
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    if (!checkWin() && !checkTie()) {
      switchPlayer();
    }
  }
}

// Function to switch player
function switchPlayer() {
  currentPlayer = (currentPlayer === humanPlayer) ? aiPlayer : humanPlayer;
  if (mode === 'ai' && currentPlayer === aiPlayer) {
    makeAiMove();
  }
}

// Function to check for a win
function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
  ];
  for (let pattern of winPatterns) {
    if (board[pattern[0]] !== '' && board[pattern[0]] === board[pattern[1]] && board[pattern[0]] === board[pattern[2]]) {
      gameOver = true;
      document.getElementById('status').textContent = `${currentPlayer} wins!`;
      return true;
    }
  }
  return false;
}

// Function to check for a tie
function checkTie() {
  if (!board.includes('')) {
    gameOver = true;
    document.getElementById('status').textContent = "It's a tie!";
    return true;
  }
  return false;
}

// Function to make AI move
function makeAiMove() {
  let emptyCells = board.reduce((acc, cell, index) => {
    if (cell === '') acc.push(index);
    return acc;
  }, []);
  let randomIndex = Math.floor(Math.random() * emptyCells.length);
  makeMove(emptyCells[randomIndex]);
}
