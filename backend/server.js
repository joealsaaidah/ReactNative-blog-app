import "dotenv/config";
import connectToDB from "./config/db.js";
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";

import postRouter from "./routes/post.js";

// connect to database
connectToDB();

//setup

//init express app
const app = express();

//middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/post", postRouter);

// should be the last middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

//test route
app.route("/").get((req, res) => {
  res.send("Hello World");
});

// Listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is listening at PORT no. ${PORT} `));
