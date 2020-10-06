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

// Route Middlewares
app.use("/api/user", authRoute);



app.listen(3000, ()=>console.log("The server is running at at port 3000"));