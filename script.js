//your JS code here. If required.
let player1 = document.getElementById("player-1");
let player2 = document.getElementById("player-2");
let submit = document.getElementById("submit");

let setup = document.getElementById("setup");
let game = document.getElementById("game");
let message = document.querySelector(".message");

let cells = document.querySelectorAll(".cell");

let players = [];
let currentPlayer = 0;
let board = ["", "", "", "", "", "", "", "", ""];

let winningPatterns = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
];

submit.addEventListener("click", function () {

    if (player1.value.trim() === "" || player2.value.trim() === "") {
        return;
    }

    players[0] = player1.value.trim();
    players[1] = player2.value.trim();

    setup.style.display = "none";
    game.style.display = "block";

    message.textContent = players[0] + ", you're up";
});

cells.forEach(function (cell) {

    cell.addEventListener("click", function () {

        let id = Number(cell.id);

        // Don't allow already filled cells
        if (board[id] !== "") {
            return;
        }

        if (currentPlayer === 0) {
            board[id] = "x";
            cell.textContent = "x";
        } else {
            board[id] = "o";
            cell.textContent = "o";
        }

        // Check winner
        for (let i = 0; i < winningPatterns.length; i++) {

            let pattern = winningPatterns[i];

            if (
                board[pattern[0]] !== "" &&
                board[pattern[0]] === board[pattern[1]] &&
                board[pattern[1]] === board[pattern[2]]
            ) {
                message.textContent =
                    players[currentPlayer] + " congratulations you won!";

                // Disable remaining cells
                cells.forEach(function (item) {
                    item.style.pointerEvents = "none";
                });

                return;
            }
        }

        // Change player
        currentPlayer = currentPlayer === 0 ? 1 : 0;

        message.textContent = players[currentPlayer] + ", you're up";
    });
});