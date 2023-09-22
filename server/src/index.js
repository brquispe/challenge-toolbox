const express = require('express');
const config = require('./config');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
require('./files/dependencies');

const app = express();
app.use(express.json());

app.use(routes);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Running on http://localhost:${config.PORT}`)
});
