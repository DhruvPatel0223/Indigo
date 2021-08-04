var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
var grid = [];
var initialGrid = [[null, null, 8, 9, 1, null, 4, null, 7], [null, null, null, null, null, 7, null, null, 5], [1, null, 7, 2, 5, 4, null, null, null], [4, 7, null, null, 9, null, 2, 5, 6], [8, null, null, null, 2, null, null, null, 9], [null, 2, null, null, null, 5, 8, null, 1], [6, null, 5, null, 7, null, 1, 3, 2], [null, 1, 9, 5, 3, null, null, null, null], [null, null, null, 1, null, null, 5, 9, null]];
var answerGrid = [[5, null, 8, 9, 1, null, 4, 2, 7], [null, null, null, null, null, 7, null, 1, 5], [1, null, 7, 2, 5, 4, null, 8, 3], [4, 7, null, null, 9, null, 2, 5, 6], [8, 5, null, null, 2, null, 3, null, 9], [null, 2, null, null, null, 5, 8, null, 1], [6, null, 5, null, 7, 9, 1, 3, 2], [null, 1, 9, 5, 3, null, 7, 6, null], [7, null, null, 1, null, null, 5, 9, null]];
document.addEventListener("keyup", writeCell, false);
var selectedCell = false;
var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var selectedCol = 0;
var selectedRow = 0;
for (var row = 0; row < $(".row").length; row++) {
    var rowArray = [];
    var rowElement = document.getElementsByClassName("row")[row];
    for (var col = 0; col < rowElement.getElementsByClassName("col").length; col++) {
        var colElement = rowElement.getElementsByClassName("col")[col];
        var clickDiv = colElement.getElementsByClassName("sudokuCell")[0];
        if (answerGrid[row][col] != null) {
            clickDiv.textContent = answerGrid[row][col];
        } else {
            clickDiv.addEventListener("click", selectCell, false);
            $(clickDiv).addClass('empty-cell');
        }
        rowArray.push(clickDiv);
    }
    grid.push(rowArray);
}


function selectCell() {
    if (selectedCell && !($(selectedCell).hasClass('incorrect'))) {
        $(selectedCell).removeClass('clicked')
        $(selectedCell).addClass('empty-cell');
    }
    selectedCell = this;
    $(this).removeClass('empty-cell');
    $(this).addClass("clicked");
    for (var row = 0; row < grid.length; row++) {
        if (grid[row].indexOf(this) != -1) {
            selectedCol = grid[row].indexOf(this);
            selectedRow = row;
        }
    }
}

function writeCell(event) {
    if (event.key == "Backspace") {
        selectedCell.textContent = "";
    } else if (numbers.indexOf(event.key) != -1) {
        selectedCell.textContent = event.key;
        checkCorrect(event.key);
    } else {

    }
}

function checkCorrect(userNum) {
    var correct = true;
    var boxRow = Math.floor(selectedRow / 3) * 3;
    var boxCol = Math.floor(selectedCol / 3) * 3;
    for (var row = 0; row < grid.length; row++) {
        if (userNum == grid[row][selectedCol].textContent && row != selectedRow) {
            correct = false;
        }
    }
    for (var col = 0; col < grid[selectedRow].length; col++) {
        if (userNum == grid[selectedRow][col].textContent && col != selectedCol) {
            correct = false;
        }
    }
    for (var row = boxRow; row < boxRow + 3; row++) {
        for (var col = boxCol; col < boxCol + 3; col++) {
            if (userNum == grid[row][col].textContent && col != selectedCol && row != selectedRow) {
                correct = false;
            }
        }
    }
    if (!correct) {
        $(selectedCell).removeClass('clicked'); 
        $(selectedCell).addClass("incorrect");
    } else {
        $(selectedCell).addClass('clicked');
        $(selectedCell).removeClass('incorrect');
        if (winCheck()) {
            var btn = document.createElement("button");
            btn.innerHTML = "End Game";
            document.body.appendChild(btn);
        }
    }
}

function winCheck() {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (grid[row][col].textContent != answerGrid[row][col] && grid[row][col].textContent != "") {
                return false;
            }
        }
    }
    return true;
}