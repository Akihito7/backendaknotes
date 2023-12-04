require('express-async-errors');

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const routes = require("./routes");
app.use(routes);

app.get("/", (req, res) => {
    res.send("Hello, world!");
  });

const appError = require('./utils/appError');
app.use((error, request, response, next) => {
    if (error instanceof appError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal error server'
    })
});

const PORT = 7777;
app.listen(PORT, console.log(`server running on port ${PORT}`))







