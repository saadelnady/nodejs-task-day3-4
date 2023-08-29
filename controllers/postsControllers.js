const Post = require("../models/postModel.js");

//get all posts
async function getAllposts(req, res) {
  try {
    const posts = await Post.find().populate("author", "userName email");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: `An error occurred`, error });
  }
}

//get user posts
async function getUserPosts(req, res) {
  try {
    const { id } = req.params;
    const posts = await Post.find({ author: id }).populate(
      "author",
      "userName email"
    );

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: `An error occurred  while   getting user posts`,
      err,
    });
  }
}

//add post
async function addPost(req, res) {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: `An error occurred`, error });
  }
}

//edit posts
async function editPost(req, res) {
  try {
    const { id } = req.params;
    const targetPost = await Post.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    if (!targetPost) {
      res.status(404).json({ message: "post not found" });
    } else {
      res
        .status(200)
        .json({ user: targetPost, message: `Post updated successfully` });
    }
  } catch (error) {
    res.status(500).json({ message: `An error occurred`, error });
  }
}

//delete posts
async function deletePost(req, res) {
  try {
    const { id } = req.params;

    const targetPost = await Post.findByIdAndDelete({ _id: id });
    if (!targetPost) {
      return res.status(404).json({ message: "post not found" });
    }
    res.status(200).json({ message: "post successfully  deleted" });
  } catch (err) {
    res.status(500).json({ message: `An error occurred`, err });
  }
}

module.exports = { getAllposts, getUserPosts, addPost, editPost, deletePost };
