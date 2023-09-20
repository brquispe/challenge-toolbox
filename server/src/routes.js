const router = require('express').Router();
const filesRoutes = require('./files/routes');

router.use('/files', filesRoutes);

module.exports = router;
