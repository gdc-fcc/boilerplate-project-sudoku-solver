const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
const puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";

suite('Unit Tests', () => {
    test('Logic handles a valid puzzle string of 81 characters', done => {
        const valid = solver.validate(puzzle);
        assert.isTrue(valid);
        done()
    })
    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', done => {
        const puzzle2 = puzzle.replace('4', 0);
        const valid = solver.validate(puzzle2);
        assert.equal(valid.error, 'Invalid characters in puzzle');
        done();
    })
    test('Logic handles a puzzle string that is not 81 characters in length', done => {
        const valid = solver.validate(puzzle.slice(1));
        assert.equal(valid.error, 'Expected puzzle to be 81 characters long');
        done();
    })
    test('Logic handles a valid row placement', done => {
        const valid = solver.checkRowPlacement(puzzle, 0, 0, '7');
        assert.isTrue(valid);
        done()
    })
    test('Logic handles an invalid row placement', done => {
        const valid = solver.checkRowPlacement(puzzle, 0, 0, '1');
        assert.isFalse(valid);
        done()
    })
    test('Logic handles a valid column placement', done => {
        const valid = solver.checkColPlacement(puzzle, 0, 0, '7');
        assert.isTrue(valid);
        done();
    })
    test('Logic handles an invalid column placement', done => {
        const valid = solver.checkColPlacement(puzzle, 0, 0, '6');
        assert.isFalse(valid);
        done();
    })
    test('Logic handles a valid region (3x3 grid) placement', done => {
        const valid = solver.checkRegionPlacement(puzzle, 0, 0, '7');
        assert.isTrue(valid);
        done();
    })
    test('Logic handles an invalid region (3x3 grid) placement', done => {
        let valid = solver.checkRegionPlacement(puzzle, 0, 0, '2');
        assert.isFalse(valid);
        valid = solver.checkRegionPlacement(puzzle, 4, 4, '1');
        assert.isFalse(valid);
        done();
    })
    test('Valid puzzle strings pass the solver')
    test('Invalid puzzle strings fail the solver', done => {
        const result = solver.solve("Z".repeat(81));
        assert.equal(result.error, 'Invalid characters in puzzle')
        done()
    })
    test('Solver returns the expected solution for an incomplete puzzle')
});
