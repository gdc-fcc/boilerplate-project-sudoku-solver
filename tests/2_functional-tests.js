const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('Solve a puzzle with', () => {
        test('valid puzzle string: POST request to /api/solve')
        test('missing puzzle string: POST request to /api/solve')
        test('invalid characters: POST request to /api/solve')
        test('incorrect length: POST request to /api/solve')
        test('Solve a puzzle no solution: POST request to /api/solve')
    })
    suite('Check a puzzle placement with', () => {
        test('all fields: POST request to /api/check')
        test('single placement conflict: POST request to /api/check')
        test('multiple placement conflicts: POST request to /api/check')
        test('all placement conflicts: POST request to /api/check')
        test('missing required fields: POST request to /api/check')
        test('invalid characters: POST request to /api/check')
        test('incorrect length: POST request to /api/check')
        test('invalid placement coordinate: POST request to /api/check')
        test('invalid placement value: POST request to /api/check')
    })
});

