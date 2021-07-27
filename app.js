const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require('path');
const contactsRouter = require("./routes/api/contacts/contacts.js");
const usersRouter=require('./routes/api/users/users.js');
const app = express();

app.use(express.static('public'))
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(404).json({ status: "error", code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ status: "fail", code: 500, message: err.message });
});

module.exports = app;
