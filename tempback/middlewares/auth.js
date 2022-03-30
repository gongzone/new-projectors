const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { createCustomError } = require("./error-handler");

const authenticateToken = async (req, res, next) => {
  try {
    // check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw createCustomError(
        "토큰 인증이 정상적으로 이루어지지 않았습니다",
        401
      );
    }

    const accessToken = authHeader.split(" ")[1];
    const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    // jwt 토큰으로부터 추출한 아이디가 ObjectId 타입인지 검사
    User.isValidId(payload.id);

    req.user = { id: payload.id };
    next();
  } catch (err) {
    next(err);
  }
};

const authorizeByRoles = async (roles, req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    // 해당 유저가 더이상 존재하지 않거나 명시한 role이 일치하지 않을 때
    if (!user || (roles.length && !roles.includes(user.role))) {
      throw createCustomError("허가되지 않은 접근입니다.", 401);
    }

    // authentication and authorization이 모두 성공했을 떄
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const auth = (...roles) => {
  const userRoles = roles || [];

  return [
    authenticateToken,
    async (req, res, next) => await authorizeByRoles(userRoles, req, res, next),
  ];
};

module.exports = auth;
