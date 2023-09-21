const { describe } = require("mocha");
const FilesService = require("../../src/files/services");
const { assert } = require("chai");

describe("File service", () => {
  const fileService = new FilesService();
  it("should group two lines by file", () => {
    const data = fileService.formatFile([
      [
        { file: "file1.csv", hex: "a", number: "1", text: "b" },
        { file: "file1.csv", hex: "b", number: "2", text: "c" },
      ],
    ]);
    const expected = [
      {
        file: "file1.csv",
        lines: [
          { hex: "a", number: "1", text: "b" },
          { hex: "b", number: "2", text: "c" },
        ],
      },
    ];

    assert.deepEqual(data, expected);
  });

  it("should group lines with 2 files", () => {
    const data = fileService.formatFile([
      [
        { file: "file1.csv", hex: "a", number: "1", text: "b" },
        { file: "file1.csv", hex: "b", number: "2", text: "c" },
      ],
      [{ file: "file2.csv", hex: "b", number: "2", text: "c" }],
    ]);
    const expected = [
      {
        file: "file1.csv",
        lines: [
          { hex: "a", number: "1", text: "b" },
          { hex: "b", number: "2", text: "c" },
        ],
      },
      {
        file: "file2.csv",
        lines: [{ hex: "b", number: "2", text: "c" }],
      },
    ];
    assert.deepEqual(data, expected);
  });
});
