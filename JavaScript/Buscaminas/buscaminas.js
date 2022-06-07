function Cell(mine, flag, clear) {
    this.mine = mine;
    this.flag = flag;
    this.clear = clear;
}

const mina = document.getElementById("mina");
const canvas = document.getElementById("buscaminas");
const ctx = canvas.getContext("2d");
const cellWidth = 40;
const cellHeight = 40;
var board;
console.log(board);

    canvas.addEventListener("mousedown", function (event) {
        const boundingRect = canvas.getBoundingClientRect();
        const x = event.clientX - boundingRect.left;
        const y = event.clientY - boundingRect.top;
        const row = Math.floor(x / cellWidth);
        const col = Math.floor(y / cellHeight);

        if (event.button == 0) {
            // Left click

            clearCell(col, row);
        } else if (event.button == 2) {
            // Right click

            printFlag(col, row);
        }
    });

function clearCell(col, row) {
    if (board[col][row].flag == false) {
        if (board[col][row].clear == false) {
            ctx.fillStyle = "beige";
            ctx.fillRect(row * 40 + 1, col * 40 + 1, 38, 38);
            ctx.fillStyle = "rgb(143, 143, 92)";

            board[col][row].clear = true;
            if (board[col][row].mine == true) {
                ctx.drawImage(mina, row * 40, col * 40, 40, 40);
            } else {
                let adjacentMines = countMines(col, row);

                if (adjacentMines == 0) {
                    clearAdjacentMines(col, row);
                } else {
                    ctx.font = "30px Arial";
                    ctx.strokeText(adjacentMines, row * 40 + 10, col * 40 + 30);
                }
            }
        }
    }
}

function clearAdjacentMines(col, row) {
    for (let i = col - 1; i <= col + 1; i++) {
        for (let j = row - 1; j <= row + 1; j++) {
            if (i >= 0 && i < board.length && j >= 0 && j < board[i].length) {
                clearCell(i, j);
            }
        }
    }
}

function countMines(col, row) {
    // col - 1 > col + 1
    // row - 1 > row + 1
    let count = Number(0);

    for (let i = col - 1; i <= col + 1; i++) {
        for (let j = row - 1; j <= row + 1; j++) {
            if (i >= 0 && i < board.length && j >= 0 && j < board[i].length) {
                if (board[i][j].mine == true) count++;
            }
        }
    }

    return count;
}

function printFlag(col, row) {
    if (board[col][row].clear == false) {
        if (board[col][row].flag == false) {
            board[col][row].flag = true;
            ctx.drawImage(flag, row * 40 + 1, col * 40 + 1, 38, 38);
        } else {
            board[col][row].flag = false;
            ctx.fillRect(row * 40 + 1, col * 40 + 1, 38, 38);
        }
    }
}

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

function draw() {
    ctx.clearRect(0, 0, 1240, 480);

    let horizontal = Number(localStorage.getItem("horizontal"));
    let vertical = Number(localStorage.getItem("vertical"));

    ctx.fillStyle = "rgb(143, 143, 92)";
    ctx.fillRect(0, 0, 40 * horizontal, 40 * vertical);

    console.log(vertical, horizontal);

    drawBoard(vertical, horizontal);
    generateMines(vertical, horizontal);

    ctx.stroke();
    ctx.stroke();
    ctx.stroke();
}

function drawBoard(vertical, horizontal) {
    ctx.moveTo(0, 0);
    ctx.lineTo(0, vertical * 40);
    ctx.lineTo(horizontal * 40, vertical * 40);
    ctx.lineTo(horizontal * 40, 0);
    ctx.lineTo(0, 0);

    for (let i = 0; i < horizontal - 1; i++) {
        let drawDistance = i * 40 + 40;
        ctx.moveTo(drawDistance, 0);
        ctx.lineTo(drawDistance, vertical * 40);
    }

    for (let i = 0; i < vertical - 1; i++) {
        let drawDistance = i * 40 + 40;
        ctx.moveTo(0, drawDistance);
        ctx.lineTo(horizontal * 40, drawDistance);
    }
}

function generateMines(vertical, horizontal) {
    let nMinas = Number(localStorage.getItem("minas"));

    console.log("Numero de minas: " + nMinas);
    console.log(vertical, horizontal);

    board = Array(vertical).fill().map(() =>
        Array(horizontal).fill().map(() =>
            new Cell(false, false, false)
        )
    );

    console.log(board);

    for (let i = 0; i < nMinas; i++) {
        var row = Math.floor(Math.random() * horizontal);
        var column = Math.floor(Math.random() * vertical);

        console.log(column, row);

        if (board[column][row].mine == false) {
            board[column][row].mine = true;
        } else {
            i--;
        }
    }

    console.log(board);
}