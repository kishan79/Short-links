const express = require("express");
const dotenv = require("dotenv");
const expressLayouts = require("express-ejs-layouts");
const helmet = require("helmet");
const xss = require("xss-clean");

const app = express();
const connectDB = require("./config/db");

dotenv.config({ path: "./.env" });

connectDB();

const home = require("./routes/home");
const link = require("./routes/link");

app.use(express.static(__dirname + "/public"));
app.use(expressLayouts);
app.set("layout", "./layouts/layout");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(xss());

app.use("/", home);
app.use("/link", link);

const PORT = process.env.PORT || 7788;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
