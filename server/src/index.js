const express = require('express');
const config = require('./config');
const errorHandler = require('./middlewares/error-handler');

const app = express();
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Running on http://localhost:${config.PORT}`)
});
