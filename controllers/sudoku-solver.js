class SudokuSolver {

  validate(puzzleString) {
    return /^[1-9.]{81}$/.test(puzzleString)
  }

  checkRowPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (column == i) {
        continue
      }
      if (value === puzzleString[9*row + i]) {
        return false
      }
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    for (let i = 0; i < 9; i++) {
      if (row == i) {
        continue
      }
      if (value === puzzleString[9*i + column]) {
        return false
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const row_start = row - row % 3;
    const col_start = column - column % 3;
    for (let i = 0; i < 3; i ++) {
      for (let j = 0; j < 3; j++) {
        if (row_start + i == row || col_start + i == column) {
          continue
        }
        if (puzzleString[9*(row_start + i) + (col_start + j)] === value) {
          return false;
        }
      }
    } 
    return true;
  }

  check(puzzleString, coordinate, value) {
    const row = coordinate[0].charCodeAt() - "A".charCodeAt();
    const col = Number(coordinate[1]) - 1;
    const conflict = [];
    if (!this.checkRowPlacement(puzzleString, row, col, value)) {
      conflict.push("row")
    }
    if (!this.checkColPlacement(puzzleString, row, col, value)) {
      conflict.push("column")
    }
    if (!this.checkRegionPlacement(puzzleString, row, col, value)) {
      conflict.push("region")
    }
    if (conflict.length > 0) {
      return {valid: false, conflict: conflict}
    }
    return {valid: true}
  }

  solve(puzzleString) {
    
  }
}

module.exports = SudokuSolver;

