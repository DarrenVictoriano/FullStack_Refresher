// Initialize Express
const express = require("express");
const app = express();
const config = require('config');

// Initialize DB and config
const mongoose = require("mongoose");

// Bodyparser Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static asset (when deployed to heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// Routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// MongoDB Confi still prefer dotenv
let db = process.env.MONGODB_URI || config.get("MONGO_URI");

// Connect MongoDB
mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


// Server PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, function () {
    console.log("Server is running on https://localhost:" + PORT);
});

