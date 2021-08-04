var grid = [];
var mode = localStorage.getItem("mode");
if(mode == 1) 
{
    var initialGrid = [[null, null, 8, 9, 1, null, 4, null, 7], [null, null, null, null, null, 7, null, null, 5], [1, null, 7, 2, 5, 4, null, null, null], [4, 7, null, null, 9, null, 2, 5, 6], [8, null, null, null, 2, null, null, null, 9], [null, 2, null, null, null, 5, 8, null, 1], [6, null, 5, null, 7, null, 1, 3, 2], [null, 1, 9, 5, 3, null, null, null, null], [null, null, null, 1, null, null, 5, 9, null]];
}
else if(mode == 2) 
{
    var initialGrid = [[null, null, 8, null, 1, null, 4, null, null], [null, null, null, null, null, 7, null, null, 5], [1, null, null, 2, 5, null, null, null, null], [null, 7, null, null, 9, null, 2, 5, null], [8, null, null, null, 2, null, null, null, null], [null, 2, null, null, null, 5, null, null, 1], [6, null, null, null, 7, null, 1, null, 2], [null, 1, null, null, 3, null, null, null, null], [null, null, null, 1, null, null, 5, 9, null]];
}
else if(mode == 3)
{
    var initialGrid = [[null, null, null, 9, null, null, null, null, 7], [null, null, null, null, null, 7, null, null, null], [1, null, null, null, 5, 4, null, null, null], [4, null, null, null, null, null, 2, null, 6], [8, null, null, null, 2, null, null, null, null], [null, 2, null, null, null, null, null, null, 1], [null, null, null, null, 7, null, null, null, 2], [null, 1, null, 5, null, null, null, null, null], [null, null, null, 1, null, null, null, 9, null]];
}
document.addEventListener("keyup", writeCell, false);
var selectedCell = false;
var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var selectedCol = 0;
var selectedRow = 0;
for (var row = 0; row < document.getElementsByClassName("row").length; row++) {
    var rowArray = [];
    var rowElement = document.getElementsByClassName("row")[row];
    for (var col = 0; col < rowElement.getElementsByClassName("col").length; col++) {
        var colElement = rowElement.getElementsByClassName("col")[col];
        var clickDiv = colElement.getElementsByClassName("sudokuCell")[0];
        if (initialGrid[row][col] != null) {
            clickDiv.textContent = initialGrid[row][col];
        } else {
            clickDiv.addEventListener("click", selectCell, false);
            clickDiv.style.setProperty("background-color", "lightgrey");
        }
        rowArray.push(clickDiv);
    }
    grid.push(rowArray);
}

function selectCell() {
    if (selectedCell) {
        selectedCell.style.setProperty("background-color", "lightgrey");
    }
    selectedCell = this;
    this.style.setProperty("background-color", "yellow");
    for (var row = 0; row < grid.length; row ++) {
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
    var boxRow = Math.floor(selectedRow/3)*3;
    var boxCol = Math.floor(selectedCol/3)*3;
    for(var row = 0; row < grid.length; row ++) {
        if (userNum == grid[row][selectedCol].textContent && row != selectedRow) {
            correct = false;
        }
    }
    for(var col = 0; col < grid[selectedRow].length; col ++) {
        if (userNum == grid[selectedRow][col].textContent && col != selectedCol) {
            correct = false;
        }
    }
    for (var row = boxRow; row < boxRow+3; row ++) {
        for (var col = boxCol; col < boxCol+3; col ++) {
            if (userNum == grid[row][col].textContent && col != selectedCol && row != selectedRow) {
                correct = false;
            }
        }
    }
    if (!correct) {
        selectedCell.style.setProperty("background-color", "red");
    } else {
        selectedCell.style.setProperty("background-color", "yellow");
    }
}