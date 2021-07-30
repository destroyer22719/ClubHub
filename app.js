const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./db");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/users", userRoutes)

app.listen(process.env.PORT || 3000, () => {
    console.log("listening on port 3000");
});
