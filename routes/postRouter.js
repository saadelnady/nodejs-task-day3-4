const express = require("express");
const routes = express.Router();
const {
  getAllposts,
  getUserPosts,
  addPost,
  editPost,
  deletePost,
} = require("../controllers/postsControllers.js");

routes.get("/", getAllposts);

routes.get("/user/:id", getUserPosts);

routes.post("/", addPost);

routes.put("/:id", editPost);

routes.delete("/:id", deletePost);

module.exports = routes;
