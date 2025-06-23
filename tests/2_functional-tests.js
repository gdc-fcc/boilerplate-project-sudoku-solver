const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

const puzzle = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";


chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('Solve a puzzle with', () => {
        test('valid puzzle string: POST request to /api/solve')
        test('missing puzzle string: POST request to /api/solve', done => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .end((_err, res) => {
                    assert.equal(res.body.error, 'Required field missing')
                    done()
                })
        })
        test('invalid characters: POST request to /api/solve', done => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({ puzzle: "Z".repeat(81) })
                .end((_err, res) => {
                    assert.equal(res.body.error, 'Invalid characters in puzzle')
                    done()
                })
        })
        test('incorrect length: POST request to /api/solve', done => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/solve')
                .send({ puzzle: puzzle.slice(1) })
                .end((_err, res) => {
                    assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
                    done()
                })
        })
        test('Solve a puzzle no solution: POST request to /api/solve')
    })
    suite('Check a puzzle placement with', () => {
        test('all fields: POST request to /api/check', done => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle: puzzle, coordinate: "A1", value: "7" })
                .end((_err, res) => {
                    assert.isTrue(res.body.valid)
                    done()
                })

        })
        test('single placement conflict: POST request to /api/check', done => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle: puzzle, coordinate: "A1", value: "6" })
                .end((_err, res) => {
                    assert.isFalse(res.body.valid)
                    assert.equal(res.body.conflict.length, 1)
                    done()
                })
        })
        test('multiple placement conflicts: POST request to /api/check', done => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle: puzzle, coordinate: "A1", value: "1" })
                .end((_err, res) => {
                    assert.isFalse(res.body.valid)
                    assert.equal(res.body.conflict.length, 2)
                    done()
                })
        })
        test('all placement conflicts: POST request to /api/check', done => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle: puzzle, coordinate: "A1", value: "5" })
                .end((_err, res) => {
                    assert.isFalse(res.body.valid)
                    assert.equal(res.body.conflict.length, 3)
                    done()
                })
        })
        test('missing required fields: POST request to /api/check', done => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle, coordinate: "A1" })
                .end((_err, res) => {
                    assert.equal(res.body.error, 'Required field(s) missing')
                    done()
                })
        })
        test('invalid characters: POST request to /api/check', done => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle: puzzle.replace(4, "Z"), coordinate: "A1", value: "7" })
                .end((_err, res) => {
                    assert.equal(res.body.error, 'Invalid characters in puzzle')
                    done()
                })
        })
        test('incorrect length: POST request to /api/check', done => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle: puzzle.slice(1), coordinate: "A1", value: "7" })
                .end((_err, res) => {
                    assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
                    done()
                })
        })
        test('invalid placement coordinate: POST request to /api/check', done => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle, coordinate: "1B", value: "7" })
                .end((_err, res) => {
                    assert.equal(res.body.error, 'Invalid coordinate')
                    done()
                })
        })
        test('invalid placement value: POST request to /api/check', done => {
            chai
                .request(server)
                .keepOpen()
                .post('/api/check')
                .send({ puzzle, coordinate: "A1", value: "0" })
                .end((_err, res) => {
                    assert.equal(res.body.error, 'Invalid value')
                    done()
                })
        })
    })
});

