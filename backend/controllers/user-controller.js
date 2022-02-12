require("dotenv").config();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const { createCustomError } = require("../errors/custom-error");

// helper functions...
const setTokenCookie = (res, token) => {
  // create http only cookie with refresh token that expires in 7 days
  const cookieOptions = {
    httpOnly: true, // secure option도 실제 배포시에는 필요
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  };
  res.cookie("refreshToken", token, cookieOptions);
};

const generateJwtToken = (user) => {
  // create a jwt token containing the user id that expires in 30 minutes
  return jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30m",
  });
};

const generateRefreshToken = (user) => {
  // create a refresh token that expires in 7 days
  return new RefreshToken({
    user: user.id,
    token: crypto.randomBytes(40).toString("hex"),
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
};

const getRefreshToken = async (res, token) => {
  const refreshToken = await RefreshToken.findOne({ token }).populate("user");

  if (!refreshToken) throw createCustomError("토큰 정보가 없습니다.", 401);

  if (refreshToken.isExpired) {
    await refreshToken.remove();
    res.clearCookie("refreshToken");
    throw createCustomError(
      "토큰의 유효시간이 경과하였습니다. 다시 로그인해 주세요",
      403
    );
  }

  return refreshToken;
};

const filterUserDetails = (user) => {
  const { id, email, nickname, role } = user;
  return { id, email, nickname, role };
};

const isValidId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// controllers...
const createUser = async (req, res) => {
  try {
    const { email, nickname, password, password2 } = req.body;

    if (password !== password2) {
      throw createCustomError(
        "비밀번호와 비밀번호 확인이 일치하지 않습니다.",
        400
      );
    }

    const user = await User.create({ email, nickname, password, role: "User" });
    return res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);

    // authentication successful so generate jwt and refresh tokens
    const jwtToken = generateJwtToken(user);
    const refreshToken = generateRefreshToken(user);

    // save refresh token and set refresh token to cookie
    await refreshToken.save();
    setTokenCookie(res, refreshToken.token);

    // return basic details and tokens
    res.status(200).json({ user: filterUserDetails(user), jwtToken });
  } catch (err) {
    next(err);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    console.log(req.user);
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken !== req.user.refreshToken.token)
      throw createCustomError("토큰 정보가 일치하지 않습니다.", 401);

    await req.user.refreshToken.remove();

    res.clearCookie("refreshToken");
    res.status(200).json({ msg: "logout 성공" });
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const paramsId = req.params.id;
    const userId = req.user.id;
    const userRole = req.user.role;

    if (paramsId !== userId && userRole !== "Admin") {
      throw createCustomError("해당 접근에 대한 권한이 없습니다.", 401);
    }

    if (!isValidId(userId))
      throw createCustomError("해당 사용자 아이디는 유효하지 않습니다.", 401);

    const user = await User.findById(id);

    if (!user) throw createCustomError("해당 사용자를 찾을 수 없습니다.", 401);

    res.status(200).json(filterUserDetails(user));
  } catch (err) {
    next(err);
  }
};

const silentRefresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    const refreshToken = await getRefreshToken(res, token);
    const { user } = refreshToken;

    // replace old refresh token with a new one and save
    const jwtToken = generateJwtToken(user);
    const newRefreshToken = generateRefreshToken(user);
    await refreshToken.remove();
    await newRefreshToken.save();

    setTokenCookie(res, newRefreshToken.token);
    res.status(200).json({ user: filterUserDetails(user), jwtToken });
  } catch (err) {
    next(err);
  }
};

// async function revokeToken({ token, ipAddress }) {
//   const refreshToken = await getRefreshToken(token);

//   // revoke token and save
//   refreshToken.revoked = Date.now();
//   refreshToken.revokedByIp = ipAddress;
//   await refreshToken.save();
// }

// async function getAll() {
//   const users = await db.User.find();
//   return users.map((x) => basicDetails(x));
// }

// async function getRefreshTokens(userId) {
//   // check that user exists
//   await getUser(userId);

//   // return refresh tokens for user
//   const refreshTokens = await db.RefreshToken.find({ user: userId });
//   return refreshTokens;
// }

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getUser,
  silentRefresh,
  // refreshToken,
  // revokeToken,
  // getAll,
  // getById,
  // getRefreshTokens,
};
