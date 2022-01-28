import "dotenv/config";
import connectToDB from "./config/db.js";
import express from "express";
import morgan from "morgan";
import postRouter from "./routes/post.js";

// connect to database
connectToDB();

//init express app
const app = express();

//middlewares
app.use(morgan("dev"));
app.use("/api/post", postRouter);

//test route
app.route("/").get((req, res) => {
  res.send("Hello World");
});

// Listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is listening at PORT no. ${PORT} `));
