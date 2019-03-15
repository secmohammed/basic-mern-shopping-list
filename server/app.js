const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const items = require("./routes/api/items");
const auth = require('./routes/api/auth');
const app = express();

// Bodyparser middleware
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/shopping-list-mern", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// Routes
app.use("/api/items", items);
app.use("/api/auth", auth);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server started on port ${port}`));
