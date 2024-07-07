const express = require('express');
const cors = require('cors');
const {meal , label} = require("./data")

// app
const app = express();

/// middle ware
app.use(cors());
// Routes
app.get("/", (req, res) => {
    res.status(201).json({msg : "Server is running"})
})

app.get("/data", (req, res) => {
    res.status(201).send({"meal" : meal, "label" : label})
})




/// listen
app.listen(3001, (req, res) => {
    console.log(`The server is running on http://localhost:3001`)
})