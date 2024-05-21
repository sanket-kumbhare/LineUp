const asyncHandler = (requestHandler) => async (req, res, next) => {
  try {
    await requestHandler(req, res, next);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      data: error.data,
      message: error.message,
      errors: error.errors,
      stackTrace: error.stack,
    });
  }
};

module.exports = asyncHandler;
