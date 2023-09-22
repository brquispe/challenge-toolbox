const { describe } = require("mocha");
const FilesService = require("../../src/files/services");
const { assert } = require("chai");

describe("File service", () => {
  const fileService = new FilesService();
  it("should group two lines by file", () => {
    const data = fileService.groupCSVFilesByFile([
      [
        { file: "file1.csv", hex: "a", number: "1", text: "b" },
        { file: "file1.csv", hex: "b", number: "2", text: "c" },
      ],
    ]);
    const expected = [
      {
        file: "file1.csv",
        lines: [
          { hex: "a", number: 1, text: "b" },
          { hex: "b", number: 2, text: "c" },
        ],
      },
    ];

    assert.deepEqual(data, expected);
  });

  it("should group lines with 2 files", () => {
    const data = fileService.groupCSVFilesByFile([
      [
        { file: "file1.csv", hex: "a2", number: "1", text: "b" },
        { file: "file1.csv", hex: "b1", number: "2", text: "c" },
      ],
      [{ file: "file2.csv", hex: "b", number: "2", text: "c" }],
    ]);
    const expected = [
      {
        file: "file1.csv",
        lines: [
          { hex: "a2", number: 1, text: "b" },
          { hex: "b1", number: 2, text: "c" },
        ],
      },
      {
        file: "file2.csv",
        lines: [{ hex: "b", number: 2, text: "c" }],
      },
    ];
    assert.deepEqual(data, expected);
  });

  it("should omit file line when hex is not 32 chars long", () => {
    const data = fileService.formatFile([
      "file,text,hex,number\nfile1.csv,a,e4312f,4",
    ]);

    const expected = [];
    assert.deepEqual(data, expected);
  });
  it("should return empty fileLines when wrong type", () => {
    const data = fileService.formatFile([
      "file,text,hex,number\nfile1.csv,a,1xj,3",
    ]);

    const expected = [];
    assert.deepEqual(data, expected);
  });
});
