// Importing Jquery
var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

// We use gridBox so that we can position the endgame button correctly
var gridBox = document.getElementById("box");

// These are all the variables for the stopwatch
var min = 0;
var sec = 0;
// The running variable is a boolean that keeps track of whether the stopwatch should keep going or not
var stoptime = true;

// A boolean variable to make sure that nothing is clickable after the game is won
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
var modal = document.getElementById("popup");

var btn = document.getElementById("btn");

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
    localStorage.setItem("difficulty", "test");
}

// Adds an event listener so that when the player types numbers,
document.addEventListener("keyup", writeCell, false);

// Variable to keep track of which cell the player selected
var selectedCell = false;

// Just an array of numbers to make sure that the player can only input numbers
var numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

// Variables to keep track of the coordinates of the selected cell
var selectedCol = 0;
var selectedRow = 0;

// Resets the timer every time the game is played
resetTimer();

// Sets up the entire grid using nested for loops to create a 2-d array to represent the grid
for (var row = 0; row < $(".row").length; row++) {

    // rowArray stores all the elements in one of the rows of the grid
    var rowArray = [];

    // rowElement stores all the columns in a row to be traversed in the next for loop
    var rowElement = document.getElementsByClassName("row")[row];
    for (var col = 0; col < rowElement.getElementsByClassName("col").length; col++) {

        // colELement does the same as rowElement but keeps track of the sudoku cells this time
        var colElement = rowElement.getElementsByClassName("col")[col];

        // clickDiv stores the current individual sudoku cell
        var clickDiv = colElement.getElementsByClassName("sudokuCell")[0];

        // Conditional statement to check if the cell should be empty or not and makes the cell clickable if it is empty
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

// This is the function for when a cell is clicked
function selectCell() {

    // If the game ends then none of the cells should be clickable
    if (clickDisabled) {
        return;
    }

    // This is a conditional to make sure that only one cell is highlighted at a time by reverting the previous selected cell back to normal
    if (selectedCell && !($(selectedCell).hasClass('incorrect-clicked'))) {
        $(selectedCell).removeClass('clicked');
        $(selectedCell).addClass('empty-cell');
    } else if (selectedCell) {
        $(selectedCell).removeClass('incorrect-clicked');
        $(selectedCell).addClass('incorrect');
    }

    // Updates the selected cell to the current one
    selectedCell = this;

    // Updates the background of the selected cell to show that it is highlighted
    $(this).removeClass('empty-cell');
    if (!$(this).hasClass('incorrect')) {
        $(this).addClass("clicked");
    } else {
        $(this).addClass("incorrect-clicked");
    }

    // For loop to traverse the entire array to find the selected cell in the grid 2-d array and then stores the coordinates of that cell
    for (var row = 0; row < grid.length; row++) {
        if (grid[row].indexOf(this) != -1) {
            selectedCol = grid[row].indexOf(this);
            selectedRow = row;
        }
    }
}

// This is the function to allow the player to type in the selected cell
function writeCell(event) {

    // Starts the timer once the player types their first entry
    startTimer();

    // Allows the player to delete their entries with backspace and keeps the player from inputing extraneous keys like the letter keys
    if (event.key == "Backspace") {
        selectedCell.textContent = "";
        $(selectedCell).removeClass('incorrect incorrect-clicked');
        $(selectedCell).addClass("clicked");
    } else if (numbers.indexOf(event.key) != -1) {
        selectedCell.textContent = event.key;
        checkCorrect(event.key);
    } else {
    }
}

// Function to check if the player's input is correct based on the current state of the board
function checkCorrect(playerNum) {
    var correct = true;

    // Variables to keep track of the current 3x3 box the player is in
    var boxRow = Math.floor(selectedRow / 3) * 3;
    var boxCol = Math.floor(selectedCol / 3) * 3;

    // For loop to check if there is any overlap in the current column
    for (var row = 0; row < grid.length; row++) {
        if (playerNum == grid[row][selectedCol].textContent && row != selectedRow) {
            correct = false;
        }
    }

    // For loop to check if there is any overlap in the current row
    for (var col = 0; col < grid[selectedRow].length; col++) {
        if (playerNum == grid[selectedRow][col].textContent && col != selectedCol) {
            correct = false;
        }
    }

    // For loop to check if there is any overlap in the current 3x3 mini box
    for (var row = boxRow; row < boxRow + 3; row++) {
        for (var col = boxCol; col < boxCol + 3; col++) {
            if (playerNum == grid[row][col].textContent && col != selectedCol && row != selectedRow) {
                correct = false;
            }
        }
    }

    // If the player is wrong the cell is highlighted red and kept that way until the player is right, otherwise the cell remains the same
    if (!correct) {
        $(selectedCell).removeClass('clicked');
        $(selectedCell).addClass("incorrect-clicked");
    } else {
        $(selectedCell).removeClass('incorrect-clicked incorrect');
        $(selectedCell).addClass('clicked');
        // Every time the player inputs a seemingly correct answer, the game will check to see if the player won and then end the game
        if (winCheck()) {
            
            // Stops the timer
            stopTimer();

            // Disables clickability
            clickDisabled = true;

            // Disables the ability to overwrite cells
            document.removeEventListener("keyup", writeCell, false);

            // Creates a button to take the player to the endscreen
            var btn = document.createElement("button");
            btn.innerHTML = "You Win! Click me to see your stats.";
            $(btn).addClass('btn btn-primary my-2');
            gridBox.appendChild(btn);
            $(btn).attr("onclick", "document.location='endscreen.html'");
            localStorage.setItem("minutes", min);
            localStorage.setItem("seconds", sec);
        }
    }
}

// Function to check if the player won
function winCheck() {

    // Traverses the entire grid and checks for any discrepancy between the current grid and the answer grid, if there is then the player has not won yet
    for (var row = 0; row < 9; row++) {
        for (var col = 0; col < 9; col++) {
            if (grid[row][col].textContent != answerGrid[row][col]) {
                return false;
            }
        }
    }
    return true;
}

// Function to start the timer
function startTimer() {
    if (stoptime) {
        stoptime = false;
        runClock();
    }
}

// Function to stop the timer
function stopTimer() {
    if (!stoptime) {
        stoptime = true;
    }
}

// Function to calculate the time
function runClock() {

    // Reverts the second and minute variables back to ints so that they can be incremented
    sec = parseInt(sec);
    min = parseInt(min);

    // Checks if the clock should actually be running
    if (!stoptime) {

        // Increments the second by one every tick
        sec++

        // If 60 seconds pass, add 1 minute and reset the seconds
        if (sec == 60) {
            min++;
            sec = 0;
        }

        // If the second is a single digit, put a 0 in front to make it look nice
        if (sec < 10 || sec == 0) {
            sec = '0' + sec;
        }

        // If the minute is a single digit, put a 0 in front to make it look nice
        if (min < 10 || min == 0) {
            min = '0' + min;
        }

        // Update the timer on the page
        document.getElementById("timer").textContent = min + ':' + sec;

        // Function to make it so that the clock actually ticks
        setTimeout("runClock()", 1000);
    }
}

// Resets the timer and the second and minute variables
function resetTimer() {
    $("#timer").html = '00:00';
    stoptime = true;
    sec = 0;
    min = 0;
}