// Initialize Express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

// Initialize DB and Routes here
const mongoose = require("mongoose");
//const routes = require("./routes");

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static asset (when deployed to heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Routes
//app.use(routes);

// Connect MongoDB
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/fsrdb";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Start the server
app.listen(PORT, function () {
    console.log("Server is running on https://localhost:" + PORT);
});

