const router = require("express").Router();
const { filesController } = require('../dependencies');

router.get('/', filesController.getFileNames.bind(filesController));
router.get('/data', filesController.getData.bind(filesController));

module.exports = router;
