require("dotenv").config();

const jwt = require("express-jwt");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const { createCustomError } = require("./error-handler");

function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret: process.env.ACCESS_TOKEN_SECRET, algorithms: ["HS256"] }),

    // authorize based on user role
    async (req, res, next) => {
      try {
        const user = await User.findById(req.user.id);

        if (!user || (roles.length && !roles.includes(user.role))) {
          // user no longer exists or role not authorized
          throw createCustomError("허가되지 않은 접근입니다.", 401);
        }

        // authentication and authorization successful
        req.user.role = user.role;
        const refreshToken = await RefreshToken.findOne({ user: user.id });
        req.user.refreshToken = refreshToken;
        next();
      } catch (err) {
        next(err);
      }
    },
  ];
}

module.exports = authorize;
