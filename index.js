const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8000;
const mongodbURL = process.env.MONGODB_URL;
const userRoutes = require("./routes/userRouter.js");
const postsRoutes = require("./routes/postRouter.js");

app.use(morgan("tiny"));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/post", postsRoutes);

app.listen(port, () => {
  console.log(`server is listening on PORT ${port} ...`);
});

async function mongodbConnect() {
  try {
    await mongoose.connect(mongodbURL);
    console.log("connected to MongoDB successfully");
  } catch (error) {
    console.log(error);
  }
}
mongodbConnect().catch((err) => console.log(err));
