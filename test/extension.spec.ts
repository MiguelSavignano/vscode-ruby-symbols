import 'mocha';
import { expect } from 'chai';
import FileParser from "../src/file_parser"
var fs = require("fs")

const expectedResult1 = [
  { name: 'method1', start_line: 1, type: 'def', end_line: 2 },
  { name: 'method1', start_line: 4, type: 'def', end_line: 8 },
  { name: 'method2', start_line: 10, type: 'def', end_line: 14 },
  { name: 'method3', start_line: 16, type: 'def', end_line: 19 },
  { name: 'MyClass', start_line: 0, type: 'class', end_line: 20 },
  { name: 'method1', start_line: 25, type: 'def', end_line: 27 },
  { name: 'ClassMethods', start_line: 24, type: 'def', end_line: 28 },
  { name: 'MyModule', start_line: 22, type: 'module', end_line: 29 },
  { name: 'method4', start_line: 31, type: 'def', end_line: 33 },
  { name: 'method5', start_line: 35, type: 'def', end_line: 36 },
  { name: 'method1', start_line: 41, type: 'def', end_line: 42 },
  { name: 'MyClass2', start_line: 39, type: 'class', end_line: 44 }
]

const expectedResult2 = [
  { name: 'hi', start_line: 18, type: 'def', end_line: 20 },
  { name: 'hi2', start_line: 22, type: 'def', end_line: 24 },
  { name: 'MyClass', start_line: 0, type: 'class', end_line: 26 }
]

describe("FileParser", () => {
  it("symbol_informations test/examples/example1.rb", (done) => {
    fs.readFile('test/examples/example1.rb', function read(err, data) {
      if (err) { throw err; }
      let fileString = data.toString()
      let fileparser = new FileParser(fileString, "", "")
      // let result = fileparser.lines
      let result = fileparser.symbol_informations()
      console.log(result)
      expect(result).to.deep.equal(expectedResult1)
      done();
    });
  });

  it("symbol_informations test/examples/example1.rb", (done) => {
    fs.readFile('test/examples/example2.rb', function read(err, data) {
      if (err) { throw err; }
      let fileString = data.toString()
      let fileparser = new FileParser(fileString, "", "")
      // let result = fileparser.lines
      let result = fileparser.symbol_informations()
      console.log(result)
      expect(result).to.deep.equal(expectedResult2)
      done();
    });
  });
});
