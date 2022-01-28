import "dotenv/config";
import express from "express";
const app = express();

app.route("/").get((req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is listening at PORT no. ${PORT} `));
