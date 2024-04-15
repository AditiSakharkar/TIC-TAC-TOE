document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const playerTurn = document.getElementById("player-turn");
    const resetBtn = document.getElementById("reset-btn");
    const player1NameInput = document.getElementById("player1-name");
    const player2NameInput = document.getElementById("player2-name");
    const player1NameDisplay = document.getElementById("player1-name-display");
    const player2NameDisplay = document.getElementById("player2-name-display");
    const player1ScoreDisplay = document.getElementById("player1-score");
    const player2ScoreDisplay = document.getElementById("player2-score");

    let currentPlayer = "X";
    let gameActive = true;
    let board = ["", "", "", "", "", "", "", "", ""];
    let player1Name = "Player 1";
    let player2Name = "Player 2";
    let player1Score = 0;
    let player2Score = 0;

    const checkWinner = () => {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                message.textContent = `${currentPlayer === "X" ? player1Name : player2Name} wins!`;
                if (currentPlayer === "X") {
                    player1Score++;
                    player1ScoreDisplay.textContent = player1Score;
                } else {
                    player2Score++;
                    player2ScoreDisplay.textContent = player2Score;
                }
                return;
            }
        }

        if (!board.includes("")) {
            gameActive = false;
            message.textContent = "It's a draw!";
        }
    };

    const handleCellClick = (index) => {
        if (gameActive && !board[index]) {
            board[index] = currentPlayer;
            cells[index].textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            playerTurn.textContent = `${currentPlayer === "X" ? player1Name : player2Name}'s turn`;
        }
    };

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handleCellClick(index));
    });

    resetBtn.addEventListener("click", () => {
        board = ["", "", "", "", "", "", "", "", ""];
        cells.forEach((cell) => {
            cell.textContent = "";
        });
        message.textContent = "";
        currentPlayer = "X";
        gameActive = true;
        playerTurn.textContent = `${player1Name}'s turn`;
    });

    const startGame = () => {
        player1Name = player1NameInput.value.trim() || "Player 1";
        player2Name = player2NameInput.value.trim() || "Player 2";
        player1NameDisplay.textContent = player1Name;
        player2NameDisplay.textContent = player2Name;
        playerTurn.textContent = `${player1Name}'s turn`;
    };

    startGame(); // Call startGame to initialize player names

    player1NameInput.addEventListener("input", startGame);
    player2NameInput.addEventListener("input", startGame);
});