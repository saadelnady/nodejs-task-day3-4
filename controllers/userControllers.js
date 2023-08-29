const User = require("../models/userModel");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
}
//get users

async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
}

//get user

async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      // Generate and send JWT
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: 86400, // expires in 24 hours
      });

      res.status(200).json({ user: user, token });
    } else {
      res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
}

async function addUser(req, res) {
  try {
    const { userName, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const targetUser = await User.findOne({ email });

    if (!targetUser) {
      const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
      });

      // Generate a JWT token
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(201).json({ newUser, token });
    }
    return res.status(400).json({ message: "User already exists" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred" });
  }
}

//edit users
async function editUser(req, res) {
  try {
    const { id } = req.params;

    const targetUser = await User.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );
    console.log(targetUser);
    if (!targetUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      res
        .status(200)
        .json({ user: targetUser, message: `user updated successfully` });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
}

//delete users
async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await User.findOneAndDelete({ _id: id });
    if (!deletedUser) {
      res.status(404).json({ message: `User not found` });
    } else {
      res.status(200).json({ message: `User deleted successfully` });
    }
  } catch (err) {
    res.status(500).json({ message: `An error occurred` });
  }
}
module.exports = {
  getAllUsers,
  addUser,
  editUser,
  deleteUser,
  getUser,
  loginUser,
};
