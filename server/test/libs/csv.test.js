const { it, describe } = require("mocha");
const { expect } = require("chai");
const CSVParser = require("../../src/libs/csv");

describe("CSV Parser", () => {
  it('should parse "name,age\nBraian,24" to { name: "Braian", age: "24" }', () => {
    const csvData = `name,age
    Braian,24`;
    const parsedValue = CSVParser.parse(csvData);
    expect(parsedValue[0]).to.have.deep.property("name", "Braian");
    expect(parsedValue[0]).to.have.deep.property("age", "24");
  });

  it("should parse name,age\nBraian,24\nAgustín,23, into an array of 2 rows", () => {
    const csvData = `name,age
    Braian,24
    Agustín,23`;
    const parsedValue = CSVParser.parse(csvData);
    expect(parsedValue).to.be.length(2);
  });

  it("should not parse incomplete rows", () => {
    const csvData = `name,age,profession
    Braian,24,Software Developer
    Agustín,23`;
    const parsedValue = CSVParser.parse(csvData);
    expect(parsedValue).to.be.length(1);
  });

  it("should not parse empty rows", () => {
    const csvData = `name,age,profession
    Braian,24,Software Developer
     , , `;
    const parsedValue = CSVParser.parse(csvData);
    expect(parsedValue).to.be.length(1);
  });
});
