/**
 * Dependencies without IOC Container
 */
const FilesService = require("./services");
const FilesController = require("./controllers");

const filesService = new FilesService();
const filesController = new FilesController(filesService);

module.exports = {
  filesService,
  filesController,
};
