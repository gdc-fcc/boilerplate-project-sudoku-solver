const get_candidates = (cell, puzzle) => {
  const ns = new Set([1,2,3,4,5,6,7,8,9])
  const col = cell % 9;
  const row = (cell - col) / 9;
  for (let i = 0; i < 9; i++) {
    ns.delete(puzzle[9*row + i])
  }
  for (let i = 0; i < 9; i++) {
    ns.delete(puzzle[9*i + col])
  }
  const box_start_row = row - row % 3;
  const box_start_col = col - col % 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        const index = 9*(box_start_row + i) + box_start_col + j;
        ns.delete(puzzle[index])
    }
  }
  return ns;
}

const get_first_empty = (puzzle) => puzzle.indexOf(0);

const solve_internal = (puzzle) => {
    const cell = get_first_empty(puzzle)
    if (cell == -1) {
        return true
    }
    for (const candidate of get_candidates(cell, puzzle)) {
        puzzle[cell] = candidate;
        if (solve_internal(puzzle)) {
            return true
        }
    }
    puzzle[cell] = 0
    return false;
}

module.exports = puzzle => {
  const puzzle_internal = [...puzzle].map(x => x == "." ? 0: Number(x));
  const solvable = solve_internal(puzzle_internal);
  if (!solvable) {
    return {error: 'Puzzle cannot be solved'};
  }
  return {solution: puzzle_internal.join("")};
}