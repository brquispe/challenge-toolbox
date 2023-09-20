const { HttpError } = require("../errors/http-error");

const handleError = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.status, message: err.message });
  } else {
    res
      .status(500)
      .json({ error: 500, message: "Internal server error: " + err.message });
  }
};

module.exports = handleError;
