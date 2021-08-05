var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
var gridBox = document.getElementById("box");
var endText = document.getElementById("endMessage");
var grid = [];
var initialGrid = [];
var answerGrid = [];
var mode = localStorage.getItem("mode");
if(mode == 1) 
{
    // initialGrid = [[null, null, 8, 9, 1, null, 4, null, 7], [null, null, null, null, null, 7, null, null, 5], [1, null, 7, 2, 5, 4, null, null, null], [4, 7, null, null, 9, null, 2, 5, 6], [8, null, null, null, 2, null, null, null, 9], [null, 2, null, null, null, 5, 8, null, 1], [6, null, 5, null, 7, null, 1, 3, 2], [null, 1, 9, 5, 3, null, null, null, null], [null, null, null, 1, null, null, 5, 9, null]];
    initialGrid = [[5, 6, 8, 9, 1, 3, 4, 2, 7], [3, 4, 2, 6, 8, 7, 9, 1, 5], [1, 9, 7, 2, 5, 4, 6, 8, 3], [4, 7, 3, 8, 9, 1, 2, 5, 6], [8, 5, 1, 7, 2, 6, 3, 4, 9], [9, 2, 6, 3, 4, 5, 8, 7, 1], [6, 8, 5, 4, 7, 9, 1, 3, 2], [2, 1, 9, 5, 3, 8, 7, 6, 4], [7, 3, 4, 1, 6, 2, 5, 9, null]];
    answerGrid = [[5, 6, 8, 9, 1, 3, 4, 2, 7], [3, 4, 2, 6, 8, 7, 9, 1, 5], [1, 9, 7, 2, 5, 4, 6, 8, 3], [4, 7, 3, 8, 9, 1, 2, 5, 6], [8, 5, 1, 7, 2, 6, 3, 4, 9], [9, 2, 6, 3, 4, 5, 8, 7, 1], [6, 8, 5, 4, 7, 9, 1, 3, 2], [2, 1, 9, 5, 3, 8, 7, 6, 4], [7, 3, 4, 1, 6, 2, 5, 9, 8]];
    localStorage.setItem("difficulty", "easy");
}
else if(mode == 2) 
{
    initialGrid = [[null, null, 8, null, null, null, 5, null, null], [null, 6, 3, null, null, null, null, null, 9], [4, 1, 5, null, null, 9, null, 7, null], [null, null, null, 1, 3, null, null, 8, null], [8, null, null, 9, null, null, 2, null, 7], [null, null, null, null, null, null, 6, null, null], [null, 5, null, 6, null, null, 8, 3, null], [null, null, null, 8, 1, null, null, null, null], [2, null, 4, 3, null, 7, 1, 9, null]];
    answerGrid = [[9, 2, 8, 4, 7, 3, 5, 6, 1], [7, 6, 3, 5, 8, 1, 4, 2, 9], [4, 1, 5, 2, 6, 9, 3, 7, 8], [6, 7, 2, 1, 3, 5, 9, 8, 4], [8, 3, 1, 9, 4, 6, 2, 5, 7], [5, 4, 9, 7, 2, 8, 6, 1, 3], [1, 5, 7, 6, 9, 4, 8, 3, 2], [3, 9, 6, 8, 1, 2, 7, 4, 5], [2, 8, 4, 3, 5, 7, 1, 9, 6]];
    localStorage.setItem("difficulty", "medium");
}
else if(mode == 3)
{
    initialGrid = [[null, 8, 7, null, null, 3, 9, null, null], [null, 5, null, null, null, null, null, null, 3], [null, null, null, null, 6, 5, null, 2, 7], [3, null, null, null, null, null, null, null, 1], [null, null, null, null, null, 8, null, null, null], [null, 9, null, null, 7, 4, null, null, null], [4, 7, null, null, null, null, null, null, 2], [null, 6, 2, 4, null, 7, 5, null, 8], [null, 3, null, null, 1, null, null, 6, null]];
    answerGrid = [[6, 8, 7, 2, 4, 3, 9, 1, 5], [2, 5, 4, 7, 9, 1, 6, 8, 3], [9, 1, 3, 8, 6, 5, 4, 2, 7], [3, 4, 5, 6, 2, 9, 8, 7, 1], [7, 2, 6, 1, 5, 8, 3, 4, 9], [8, 9, 1, 3, 7, 4, 2, 5, 6], [4, 7, 9, 5, 8, 6, 1, 3, 2], [1, 6, 2, 4, 3, 7, 5, 9, 8], [5, 3, 8, 9, 1, 2, 7, 6, 4]];
    localStorage.setItem("difficulty", "hard");
}
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
        if (initialGrid[row][col] != null) {
            clickDiv.textContent = initialGrid[row][col];
        } else {
            clickDiv.addEventListener("click", selectCell, false);
            $(clickDiv).addClass('empty-cell');
        }
        rowArray.push(clickDiv);
    }
    grid.push(rowArray);
}


function selectCell() {
    if (selectedCell && !($(selectedCell).hasClass('incorrect-clicked'))) {
        $(selectedCell).removeClass('clicked');
        $(selectedCell).addClass('empty-cell');
    } else if (selectedCell) {
        $(selectedCell).removeClass('incorrect-clicked');
        $(selectedCell).addClass('incorrect');
    }
    selectedCell = this;
    $(this).removeClass('empty-cell');
    if (!$(this).hasClass('incorrect')) {
        $(this).addClass("clicked");
    } else {
        $(this).addClass("incorrect-clicked");
    }
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
    }
    if (numbers.indexOf(event.key) != -1) {
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
        $(selectedCell).addClass("incorrect-clicked");
    } else {
        $(selectedCell).removeClass('incorrect-clicked');
        $(selectedCell).addClass('clicked');
        $(selectedCell).removeClass('incorrect');
        if (winCheck()) {
            var btn = document.createElement("button");
            btn.innerHTML = "You Win! Click me to see your stats.";
            $(btn).addClass('btn btn-primary my-2');
            gridBox.appendChild(btn);
            $(btn).attr("onclick", "document.location='endscreen.html'");
            endText.textContent = `Congrats, you beat Sudoku ${localStorage.getItem("difficulty")} in *time*!`;
        }
    }
}

function winCheck() {
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (grid[row][col].textContent != answerGrid[row][col]) {
                return false;
            }
        }
    }
    return true;
}