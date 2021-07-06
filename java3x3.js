function startoverlay() {
    document.getElementById("overlay1").style.display = "block";
}

function endoverlay() {
    document.getElementById("overlay1").style.display = "none";
}


var noRows = 3;
var noCols = 3;
var tileSize = 120;
var margin = 10;
const table2 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, " "]
];
var table = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, " "]
];
var board = $("<div></div");
var noMoves = 0;


function buildBoard() {
    board.addClass("puzzle-box");
    board.width((tileSize * noCols) + (margin * (noCols + 1)));
    board.height((tileSize * noRows) + (margin * (noRows + 1)));
    $("h1").parent().append(board);

}

function buildTile() {
    var i = 0;
    for (j = 0; j < noRows; j++) {
        for (k = 0; k < noCols; k++) {
            var tile = $("<div>" + table[j][k] + "</div>");
            tile.addClass("tile");
            tile.width(tileSize);
            tile.height(tileSize);
            tile.css("font-size", 2 / 3 * tileSize);
            var col = i % noCols;
            var row = Math.floor(i / noCols);
            board.append(tile);
            positionTile(row, col, tile, false);
            i++;
        }
    }

    $(".tile").click(clickTile);
}

function positionTile(row, col, tile, smooth) {
    var x = col * (tileSize + margin) + margin;
    var y = row * (tileSize + margin) + margin;
    if (!smooth) {
        tile.css("left", x);
        tile.css("top", y);
    } else {
        tile.animate({
            left: x,
            top: y
        }, 150);
    }
}

function clickTile() {
    var tile = $(event.currentTarget);
    var value = parseInt(tile.text());
    var x, y;
    if (noCols >= noRows) {
        outer: for (y = 0; y < noCols; y++) {
            for (x = 0; x < noRows; x++) {
                if (table[x][y] === value) {
                    break outer;
                }
            }
        }
    }
    if (noCols < noRows) {
        outer: for (x = 0; x < noRows; x++) {
            for (y = 0; y < noCols; y++) {
                if (table[x][y] === value) {
                    break outer;
                }
            }
        }
    }
    moveTile(x, y, tile);
}

/*document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        alert("up key");
    } else if (e.keyCode == '40') {
        alert("down key");
    } else if (e.keyCode == '37') {
        alert("left key");
    } else if (e.keyCode == '39') {
        alert("right key");
    }

}*/

function moveTile(row, col, tile) {
    var dx = 0;
    var dy = 0;
    if (col > 0 && table[row][col - 1] == " ") {
        dx = -1;
    } else if (col < noCols - 1 && table[row][col + 1] == " ") {
        dx = 1;
    } else if (row > 0 && table[row - 1][col] == " ") {
        dy = -1;
    } else if (row < noRows - 1 && table[row + 1][col] == " ") {
        dy = 1;
    } else {
        return;
    }
    var value = table[row][col];
    table[row + dy][col + dx] = value;
    table[row][col] = " ";
    noMoves++;
    localStorage.setItem("moves", noMoves);
    document.getElementById("move").innerHTML = localStorage.getItem("moves");
    buildTile();
    checkWin();
    positionTile(row + dy, col + dx, tile, true);
}

function shuffle() {
    noMoves = 0;
    for (var row = 0; row < noRows; row++) {
        for (var column = 0; column < noCols; column++) {
            var row2 = Math.floor(Math.random() * noRows);
            var column2 = Math.floor(Math.random() * noCols);
            var i = parseInt(row);
            var j = parseInt(column);
            var k = parseInt(row2);
            var l = parseInt(column2);
            swapTiles(i, j, k, l);
        }
    }
}

function swapTiles(i, j, k, l) {
    var t1 = table[i][j];
    table[i][j] = table[k][l];
    table[k][l] = t1;
    buildTile();
}

function checkWin() {
    var mySound = document.getElementById("wins");
    var k = 0;
    for (i = 0; i < noRows; i++) {
        for (j = 0; j < noCols; j++) {
            if (table[i][j] == table2[i][j]) {
                k++;
            }
        }
    }
    if (k == noCols * noRows) {
        mySound.play();
        alert("Congratulations! You solved the puzzle in " + noMoves + " moves " + "\nGreat! Loyalty, and Patience, You are put into HUFFLEPUFF!!");
        noMoves = 0 ;
    };
}



buildBoard();
buildTile();
