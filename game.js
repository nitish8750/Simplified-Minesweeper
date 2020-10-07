checkMine = (row, col, arr) => {
  if (row < 0 || col < 0) return 0;
  if (row >= arr.length) return 0;
  if (col > arr[row].length) return 0;
  if (arr[row][col] === "mine") return 1;
  return 0;
};

minesGrid = (rows, columns, mines) => {
  let grid = new Array(rows);
  for (let i = 0, l = grid.length; i < l; i++) {
    grid[i] = new Array(columns);
  }
  for (let mine = 0; mine < mines; mine++) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    grid[r][c] = "mine";
  }

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < columns; y++) {
      if (grid[x][y] !== "mine") {
        let count = 0;
        if (checkMine(x, y, grid) !== 1) {
          count += checkMine(x - 1, y - 1, grid);
          count += checkMine(x - 1, y, grid);
          count += checkMine(x - 1, y + 1, grid);
          count += checkMine(x, y - 1, grid);
          count += checkMine(x, y + 1, grid);
          count += checkMine(x + 1, y - 1, grid);
          count += checkMine(x + 1, y, grid);
          count += checkMine(x + 1, y + 1, grid);
        }
        grid[x][y] = count;
      }
    }
  }
  return grid;
};

createGrid = () => {
  const mineSweeperGrid = document.querySelector(".mineSweeperGrid");
  mineSweeperGrid.innerHTML = "";

  let rows = parseInt(document.getElementById("rows").value);
  let columns = parseInt(document.getElementById("columns").value);
  let mines = parseInt(document.getElementById("mines").value);

  if (rows < 1 || columns < 1 || mines < 1) {
    alert("Enter larger Values");
  } else if (rows > 15 || columns > 15 || mines > rows * columns) {
    alert("Enter values smaller than 15");
  } else if (rows <= 15 && columns <= 15 && mines < rows * columns) {
    let arr = minesGrid(rows, columns, mines);
    for (let i = 0, len = arr.length; i < len; i++) {
      const row = document.createElement("div");
      row.className = "gridRow";
      for (let j = 0, l = arr[i].length; j < l; j++) {
        const col = document.createElement("div");
        col.className = "gridCol hidden";
        if (arr[i][j] === "mine") {
          col.classList.add("mines");
          col.textContent = `\u{2600}`;
        } else {
          col.textContent = arr[i][j];
        }
        row.appendChild(col);
      }
      document.querySelector(".mineSweeperGrid").appendChild(row);
    }
  }
};

document.addEventListener("DOMContentLoaded", createGrid);

document
  .querySelector(".mineSweeperGrid")
  .addEventListener("click", function (e) {
    e.target.classList.remove("hidden");

    if (e.target && e.target.className == "gridCol mines") {
      let cells = document.getElementsByClassName("gridCol");
      for (let i = 0; i < cells.length; i++) {
        cells[i].classList.remove("hidden");
      }
      alert("You Lost");
    }
  });
