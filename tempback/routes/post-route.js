const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post-controller");

router.route("/").post(createPost).get(getAllPosts);

router.route("/:id/").get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
