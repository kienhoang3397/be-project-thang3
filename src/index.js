const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require('./routes')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


dotenv.config()

const app = express()
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(cors())

app.use(bodyParser.json())
app.use(cookieParser())

routes(app);

mongoose
    .connect(`${process.env.MONGO_DB}`)
    .then(() => {
        console.log("Connected to MongoDB");

        app.get("/", (req, res) => {
            res.send("MongoDB is connected!");
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error.message);
    });
