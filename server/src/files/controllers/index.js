const { NotFoundError } = require("../../errors");
const { FileNotFoundError } = require("../errors");

class FileController {
  #fileService;
  /** @param {import("../services")} fileService */
  constructor(fileService) {
    this.#fileService = fileService;
  }

  async getData(req, res, next) {
    try {
      const fileName = req.query?.fileName;
      const data = await this.#fileService.getData(fileName);
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = FileController;
