const router = require("express").Router();
const { filesController } = require('../dependencies');

router.get('/data', filesController.getData.bind(filesController));

module.exports = router;
