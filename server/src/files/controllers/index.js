class FileController {
  #fileService;
  /** @param {import("../services")} fileService */
  constructor(fileService) {
    this.#fileService = fileService;
  }

  async getData(req, res, next) {
    try {
      const data = await this.#fileService.getData();
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = FileController;
