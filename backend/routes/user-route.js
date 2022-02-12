const express = require("express");
const router = express.Router();

const authorize = require("../middlewares/auth-token");

const {
  createUser,
  loginUser,
  logoutUser,
  getUser,
  silentRefresh,
} = require("../controllers/user-controller");

router.route("/register/").post(createUser);

router.route("/login/").post(loginUser);

router.route("/logout/").post(authorize(), logoutUser);

router.route("/:id/").get(authorize(), getUser);

router.route("/silent-refresh/").post(silentRefresh);

module.exports = router;
