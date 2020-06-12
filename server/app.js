const express = require("express");
var cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const {MONGOURI} = require("./keys"); 
require("./models/user");
require("./models/post");

app.use(express.json());
app.use(cors());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.log("Not Connected to MongoDB - ", err);
});

app.listen(PORT, () =>{
    console.log("Server is running on: ", PORT);
});