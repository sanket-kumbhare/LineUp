const ApiError = require("./ApiError");

const validationErrors = (error) => {
  if (error) {
    const { details } = error;
    const message = details.map((i) => i.message).join(",");
    throw new ApiError(400, message);
  }
};

module.exports = { validationErrors };
