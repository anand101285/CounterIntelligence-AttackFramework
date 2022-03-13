const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.get("/", (req, res) => res.send("API Running"));

app.use(express.json({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
app.use("/viewaccess", require("./routes/api/get_details"));
app.use("/api/honeytoken", require("./routes/api/honeytoken"));
app.use("/download/exe/", require("./routes/api/download_file"));
app.use("/mongo", require("./routes/api/testing_route"));
app.use("/api/database", require("./routes/api/database"));

// auth, login and sign-up
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
// app.use("/api/profile", require("./routes/api/profile"));

// error handling route
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message } || "An unknown error occurred");
});

// const PORT = process.env.PORT || 5000;
const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
