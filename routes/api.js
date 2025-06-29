'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      res.json(solver.check(req.body.puzzle, req.body.coordinate, req.body.value));
    });
    
  app.route('/api/solve')
    .post((req, res) => {
       res.json(solver.solve(req.body.puzzle))
    });
};
