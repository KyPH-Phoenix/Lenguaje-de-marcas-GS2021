function Cell(mine, flag, open) {
    this.mine = mine;
    this.flag = flag;
    this.open = open;
}

const canvas = document.getElementById("buscaminas");
const ctx = canvas.getContext("2d");
const cellWidth = 40;
const cellHeight = 40;

canvas.addEventListener("mousedown", function (event) {
    console.log(event);
    const boundingRect = canvas.getBoundingClientRect();
    const x = event.clientX - boundingRect.left;
    const y = event.clientY - boundingRect.top;
    const col = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);

    if (event.button == 0) {
        console.log("Left click");
        console.log(col, row)
    } else if (event.button == 2) {
        console.log("Right click");
        console.log(col, row)
    }
});

document.addEventListener("contextmenu", function (event) {
    console.log("event");
    event.preventDefault(); 
});

function draw() {
    let horizontal = Number(localStorage.getItem("horizontal"));
    let vertical = Number(localStorage.getItem("vertical"));
    let board = Array(vertical).fill().map(() => 
        Array(horizontal).fill().map(() => 
            new Cell(false, false, false)
        )
    );

    console.log(board); 

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

    var mina = document.getElementById("mina");
    ctx.drawImage(mina, 0, 0, 40, 40);
    ctx.drawImage(mina, 80, 160, 40, 40);
    ctx.drawImage(mina, 240, 360, 40, 40);
    ctx.drawImage(mina, 200, 280, 40, 40);
    ctx.drawImage(mina, 120, 40, 40, 40);
    ctx.drawImage(mina, 80, 360, 40, 40);
    ctx.drawImage(mina, 160, 120, 40, 40);
    ctx.drawImage(mina, 280, 120, 40, 40);

    ctx.stroke();
    ctx.stroke();
    ctx.stroke();
}