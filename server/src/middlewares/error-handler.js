const { NotFoundError } = require('../errors')

const handleError = (err, req, res, next) => {
  if (err instanceof NotFoundError) {
    res.status(404).json({ error: 404, message: err.message })
  } else {
    res
      .status(500)
      .json({ error: 500, message: 'Internal server error: ' + err.message })
  }
}

module.exports = handleError
