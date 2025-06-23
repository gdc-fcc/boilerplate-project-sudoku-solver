const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {
    test('Logic handles a valid puzzle string of 81 characters')
    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)')
    test('Logic handles a puzzle string that is not 81 characters in length')
    test('Logic handles a valid row placement')
    test('Logic handles an invalid row placement')
    test('Logic handles a valid column placement')
    test('Logic handles an invalid column placement')
    test('Logic handles a valid region (3x3 grid) placement')
    test('Logic handles an invalid region (3x3 grid) placement')
    test('Valid puzzle strings pass the solver')
    test('Invalid puzzle strings fail the solver')
    test('Solver returns the expected solution for an incomplete puzzle')
});
