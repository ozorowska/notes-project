const express = require("express");
const path = require("path");
const app = express();

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.g0e3r9r.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const notesRoutes = require("./api/routes/notes");
app.use("/notes", notesRoutes);

const usersRoutes = require("./api/routes/users");
app.use("/users", usersRoutes);

const appRoutes = require("./api/routes/app");
app.use("/", appRoutes);

app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
