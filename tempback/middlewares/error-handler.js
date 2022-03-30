const { CustomAPIError } = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
  switch (true) {
    case err instanceof CustomAPIError:
      // 커스텀 에러인 경우
      return res.status(err.statusCode).json({ message: err.message });
    case err.name === "ValidationError":
      // mongoose validation error
      return res.status(400).json({ message: "Validation 에러입니다." });
    case err.name === "UnauthorizedError":
      // jwt authentication error
      return res.status(401).json({ message: "허가되지 않은 접근입니다." });
    default:
      return res.status(500).json({ message: err.message });
  }
};

module.exports = errorHandler;
