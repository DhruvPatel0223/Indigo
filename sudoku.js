var grid = [];
for(let row of document.getElementsByClassName("row")) {
   var rowArray = []
   for(let col of row.getElementsByClassName("col p-0")) {
       rowArray.push(col.getElementsByClassName("sudokuCell")[0]);
   }
   grid.push(rowArray);
}
