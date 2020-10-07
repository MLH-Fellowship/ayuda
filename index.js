const express = require('express');
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config(); // reads the .env file

// Connect to db
mongoose.connect(
    `${process.env.MONGO_URL}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    }
);

// Middleware
app.use(express.json());

// Import Routes
const authRoute = require("./routes/auth");
const subjectsRoute = require("./routes/subject");
const topicsRoute = require("./routes/topic");
const questionsRoute = require("./routes/question");


// Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/topics", topicsRoute);
app.use("/api/questions", questionsRoute);
app.use("/api/subjects", subjectsRoute);


app.listen(3000, ()=>console.log("The server is running at at port 3000"));