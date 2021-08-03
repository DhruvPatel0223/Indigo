var grid = [];
var initialGrid = [[null, null, 8, 9, 1, null, 4, null, 7], [null, null, null, null, null, 7, null, null, 5], [1, null, 7, 2, 5, 4, null, null, null], [4, 7, null, null, 9, null, 2, 5, 6], [8, null, null, null, 2, null, null, null, 9], [null, 2, null, null, null, 5, 8, null, 1], [6, null, 5, null, 7, null, 1, 3, 2], [null, 1, 9, 5, 3, null, null, null, null], [null, null, null, 1, null, null, 5, 9, null]];
for (var row = 0; row < document.getElementsByClassName("row").length; row ++) {
    var rowArray = [];
    var rowElement = document.getElementsByClassName("row")[row];
    for (var col = 0; col < rowElement.getElementsByClassName("col").length; col ++) {
        var colElement = rowElement.getElementsByClassName("col")[col];
        var clickDiv = colElement.getElementsByClassName("sudokuCell")[0];
        if(initialGrid[row][col] != null) {
            clickDiv.textContent = initialGrid[row][col];
        } else {
            clickDiv.addEventListener("click", selectCell, false);
        }
        rowArray.push(clickDiv);
    }
    grid.push(rowArray);
}

function selectCell() {
    this.setAttribute("style", "background-color: yellow");
}