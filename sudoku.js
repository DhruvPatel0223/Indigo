// Importing Jquery
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
var gridBox = document.getElementById("box");
var endText = document.getElementById("endMessage");
// These are all the variables for the stopwatch
var min = 0;
var sec = 0;
// The running variable is a boolean that keeps track of whether the stopwatch should keep going or not
var stoptime = true;

var clickDisabled = false;

// The grid variable is the grid that the player sees and updates according to what the player inputs
var grid = [];

// The initialGrid variable is the puzzle that the player must solve
var initialGrid = [];

// The answerGrid variable is what the fully completed puzzle that we use to check for when the player wins
var answerGrid = [];

// The mode variable keeps track of which difficulty the player selected on the beginning screen by storing it in local storage
var mode = localStorage.getItem("mode");

//help button
var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// This is what determines which puzzle the player will have to solve depending on which difficulty they chose
if (mode == 1) {
    initialGrid = [[null, null, 8, 9, 1, null, 4, null, 7], [null, null, null, null, null, 7, null, null, 5], [1, null, 7, 2, 5, 4, null, null, null], [4, 7, null, null, 9, null, 2, 5, 6], [8, null, null, null, 2, null, null, null, 9], [null, 2, null, null, null, 5, 8, null, 1], [6, null, 5, null, 7, null, 1, 3, 2], [null, 1, 9, 5, 3, null, null, null, null], [null, null, null, 1, null, null, 5, 9, null]];
    answerGrid = [[5, 6, 8, 9, 1, 3, 4, 2, 7], [3, 4, 2, 6, 8, 7, 9, 1, 5], [1, 9, 7, 2, 5, 4, 6, 8, 3], [4, 7, 3, 8, 9, 1, 2, 5, 6], [8, 5, 1, 7, 2, 6, 3, 4, 9], [9, 2, 6, 3, 4, 5, 8, 7, 1], [6, 8, 5, 4, 7, 9, 1, 3, 2], [2, 1, 9, 5, 3, 8, 7, 6, 4], [7, 3, 4, 1, 6, 2, 5, 9, 8]];
    localStorage.setItem("difficulty", "easy");
}
else if (mode == 2) {
    initialGrid = [[null, null, 8, null, null, null, 5, null, null], [null, 6, 3, null, null, null, null, null, 9], [4, 1, 5, null, null, 9, null, 7, null], [null, null, null, 1, 3, null, null, 8, null], [8, null, null, 9, null, null, 2, null, 7], [null, null, null, null, null, null, 6, null, null], [null, 5, null, 6, null, null, 8, 3, null], [null, null, null, 8, 1, null, null, null, null], [2, null, 4, 3, null, 7, 1, 9, null]];
    answerGrid = [[9, 2, 8, 4, 7, 3, 5, 6, 1], [7, 6, 3, 5, 8, 1, 4, 2, 9], [4, 1, 5, 2, 6, 9, 3, 7, 8], [6, 7, 2, 1, 3, 5, 9, 8, 4], [8, 3, 1, 9, 4, 6, 2, 5, 7], [5, 4, 9, 7, 2, 8, 6, 1, 3], [1, 5, 7, 6, 9, 4, 8, 3, 2], [3, 9, 6, 8, 1, 2, 7, 4, 5], [2, 8, 4, 3, 5, 7, 1, 9, 6]];
    localStorage.setItem("difficulty", "medium");
}
else if (mode == 3) {
    initialGrid = [[null, 8, 7, null, null, 3, 9, null, null], [null, 5, null, null, null, null, null, null, 3], [null, null, null, null, 6, 5, null, 2, 7], [3, null, null, null, null, null, null, null, 1], [null, null, null, null, null, 8, null, null, null], [null, 9, null, null, 7, 4, null, null, null], [4, 7, null, null, null, null, null, null, 2], [null, 6, 2, 4, null, 7, 5, null, 8], [null, 3, null, null, 1, null, null, 6, null]];
    answerGrid = [[6, 8, 7, 2, 4, 3, 9, 1, 5], [2, 5, 4, 7, 9, 1, 6, 8, 3], [9, 1, 3, 8, 6, 5, 4, 2, 7], [3, 4, 5, 6, 2, 9, 8, 7, 1], [7, 2, 6, 1, 5, 8, 3, 4, 9], [8, 9, 1, 3, 7, 4, 2, 5, 6], [4, 7, 9, 5, 8, 6, 1, 3, 2], [1, 6, 2, 4, 3, 7, 5, 9, 8], [5, 3, 8, 9, 1, 2, 7, 6, 4]];
    localStorage.setItem("difficulty", "hard");
}
else if (mode == 4) {
    initialGrid = [[6, 8, 7, 2, 4, 3, 9, 1, 5], [2, 5, 4, 7, 9, 1, 6, 8, 3], [9, 1, 3, 8, 6, 5, 4, 2, 7], [3, 4, 5, 6, 2, 9, 8, 7, 1], [7, 2, 6, 1, 5, 8, 3, 4, 9], [8, 9, 1, 3, 7, 4, 2, 5, 6], [4, 7, 9, 5, 8, 6, 1, 3, 2], [1, 6, 2, 4, 3, 7, 5, 9, 8], [5, 3, 8, 9, 1, 2, 7, 6, null]];
    answerGrid = [[6, 8, 7, 2, 4, 3, 9, 1, 5], [2, 5, 4, 7, 9, 1, 6, 8, 3], [9, 1, 3, 8, 6, 5, 4, 2, 7], [3, 4, 5, 6, 2, 9, 8, 7, 1], [7, 2, 6, 1, 5, 8, 3, 4, 9], [8, 9, 1, 3, 7, 4, 2, 5, 6], [4, 7, 9, 5, 8, 6, 1, 3, 2], [1, 6, 2, 4, 3, 7, 5, 9, 8], [5, 3, 8, 9, 1, 2, 7, 6, 4]];
}

// Adds an event listener so that when the player types numbers,
document.addEventListener("keyup", writeCell, false);

var selectedCell = false;
var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
var selectedCol = 0;
var selectedRow = 0;
resetTimer();
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
    if (clickDisabled) {
        return;
    }
    startTimer();
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
        $(selectedCell).removeClass('incorrect incorrect-clicked');
        $(selectedCell).addClass("clicked");
    }
    if (numbers.indexOf(event.key) != -1) {
        selectedCell.textContent = event.key;
        checkCorrect(event.key);
    } else {

    }
}

function checkCorrect(playerNum) {
    var correct = true;
    var boxRow = Math.floor(selectedRow / 3) * 3;
    var boxCol = Math.floor(selectedCol / 3) * 3;
    for (var row = 0; row < grid.length; row++) {
        if (playerNum == grid[row][selectedCol].textContent && row != selectedRow) {
            correct = false;
        }
    }
    for (var col = 0; col < grid[selectedRow].length; col++) {
        if (playerNum == grid[selectedRow][col].textContent && col != selectedCol) {
            correct = false;
        }
    }
    for (var row = boxRow; row < boxRow + 3; row++) {
        for (var col = boxCol; col < boxCol + 3; col++) {
            if (playerNum == grid[row][col].textContent && col != selectedCol && row != selectedRow) {
                correct = false;
            }
        }
    }
    if (!correct) {
        $(selectedCell).removeClass('clicked');
        $(selectedCell).addClass("incorrect-clicked");
    } else {
        $(selectedCell).removeClass('incorrect-clicked incorrect');
        $(selectedCell).addClass('clicked');
        if (winCheck()) {
            stopTimer();
            clickDisabled = true;
            document.removeEventListener("keyup", writeCell, false);
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

function startTimer() {
    if (stoptime) {
        stoptime = false;
        runClock();
    }
}

function stopTimer() {
    if (!stoptime) {
        stoptime = true;
    }
}

function runClock() {
    sec = parseInt(sec);
    min = parseInt(min);
    if (!stoptime) {
        sec++
        if (sec == 60) {
            min++;
            sec = 0;
        }
        if (sec < 10 || sec == 0) {
            sec = '0' + sec;
        }
        if (min < 10 || min == 0) {
            min = '0' + min;
        }
        document.getElementById("timer").textContent = min + ':' + sec;
        setTimeout("runClock()", 1000);
    }
}

function resetTimer() {
    $("#timer").html = '00:00';
    stoptime = true;
    sec = 0;
    min = 0;
}