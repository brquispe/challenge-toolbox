const express = require('express')
const config = require('./config')
const routes = require('./routes')
const errorHandler = require('./middlewares/error-handler')
require('./files/dependencies')

const app = express()
app.use(express.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
})

app.use(routes)
app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log(`Running on http://localhost:${config.PORT}`)
})
