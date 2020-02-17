// Initialize Express
const express = require("express");
const app = express();

// Initialize DB and Routes here
const mongoose = require("mongoose");

// Middlewares to parse data passed to the server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static asset (when deployed to heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Routes
const routes = require("./routes/api/items");
app.use("/api/items", routes);

// MongoDB Confi g
let MONGODB_URI = process.env.MONGODB_URI || require('./config/keys').MONGO_URI;
// Connect MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


// Server PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, function () {
    console.log("Server is running on https://localhost:" + PORT);
});

