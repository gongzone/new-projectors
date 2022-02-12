require("dotenv").config();

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const RefreshToken = require("../models/RefreshToken");

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
  // create a jwt token containing the user id that expires in 15 minutes
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
  try {
    const refreshToken = await RefreshToken.findOne({ token }).populate("user");
    console.log(`refreshToken is Expired?: ${refreshToken.isExpired}`);

    if (!refreshToken) throw "토큰 정보가 없습니다.";

    if (refreshToken.isExpired) {
      await refreshToken.remove();
      res.clearCookie("refreshToken");
      throw "토큰 인증 기간이 만료되었습니다. 다시 로그인해주세요.";
    }

    return refreshToken;
  } catch (err) {
    return res.status(400).json({ msg: err });
  }
};

const filterUserDetails = (user) => {
  const { id, email, nickname, role } = user;
  return { id, email, nickname, role };
};

const isValidId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

// controllers... 에러핸들링 필요!!@!@!@!@!@!@!@!@!@
const createUser = async (req, res) => {
  console.log(req.body);
  const { email, nickname, password, password2 } = req.body;

  if (password !== password2) {
    return res.status(500).send("비밀번호가 일치하지 않습니다.");
  }

  try {
    const user = await User.create({ email, nickname, password, role: "User" });
    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    res.status(400).send("회원가입할 수 없습니다.");
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
    console.log(refreshToken.token);
    setTokenCookie(res, refreshToken.token);

    // return basic details and tokens
    res.status(200).json({ user: filterUserDetails(user), jwtToken });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "유저 정보 없음" });
  }
};

const logoutUser = async (req, res, next) => {
  try {
    console.log(req.user);
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken !== req.user.refreshToken.token)
      return res.status(401).json({ msg: "토큰이 일치하지 않습니다." });

    await req.user.refreshToken.remove();

    res.clearCookie("refreshToken");
    res.status(200).json({ msg: "logout 성공" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err });
  }
};

const getUser = async (req, res, next) => {
  const paramsId = req.params.id;
  const userId = req.user.id;
  const userRole = req.user.role;

  if (paramsId !== userId && userRole !== "Admin") {
    return res.status(401).json({ message: "권한이 없습니다." });
  }

  if (!isValidId(userId)) throw "해당 사용자를 찾을 수 없습니다.";

  const user = await User.findById(id);

  if (!user) throw "해당 사용자를 찾을 수 없습니다.";

  res.status(200).json(filterUserDetails(user));
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
    console.log(err);
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
