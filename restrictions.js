function restriction()
{
    // row restrictions (checks for repeats horizontally)
    for(let v = 0; v<9; v++)
    {
        for(let a = 0; a<8; a++)
        {
            if(grid[v][a] == grid[v][a+1])
            {
                this.setAttribute("style", "background-color: red");
            }
        }
    }
    // column restrictions (check for repeats vertically)
    for(let v = 0; v<9; v++)
    {
        for(let a = 0; a<8; a++)
        {
            if(grid[a][v] == grid[a+1][v])
            {
                this.setAttribute("style", "background-color: red");
            }
        }
    }
}