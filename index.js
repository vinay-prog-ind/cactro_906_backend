const express = require("express");
const router = require("./src/routes/route.githubApi");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/github", router);
app.use(cors());


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port:${PORT}`);
});