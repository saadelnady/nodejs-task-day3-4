const express = require("express");
const {
  getAllUsers,
  addUser,
  editUser,
  deleteUser,
  getUser,
  loginUser,
} = require("../controllers/userControllers.js");
const authenticateToken = require("../middlewares/authMiddleware.js");

const router = express.Router();

// Public routes
router.post("/", addUser); // Add a new user
router.post("/login", loginUser); // User login route (no authentication required)

// Protected routes
router.use(authenticateToken); // Apply authentication middleware to all routes below

router.get("/", getAllUsers); // Fetch all users
router.get("/:id", getUser); // Fetch user by email
router.put("/:id", editUser); // Edit user data
router.delete("/:id", deleteUser); // Delete user account

module.exports = router;
