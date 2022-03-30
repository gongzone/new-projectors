const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const {
  validateSignup,
  validateLogin,
} = require("../middlewares/validate-request");

const {
  createUser,
  loginUser,
  logoutUser,
  getUser,
  silentRefresh,
} = require("../controllers/user-controller");

router.route("/signup/").post(validateSignup, createUser);

router.route("/login/").post(validateLogin, loginUser);

router.route("/logout/").post(auth(), logoutUser);

router.route("/:id/").get(auth(), getUser);

router.route("/silent-refresh/").post(silentRefresh);

module.exports = router;
