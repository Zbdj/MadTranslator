const express = require('express')
const app = express();

var cors = require('cors')
app.use(cors());


app.get('/', function (req, res) {
    res.json("Hello World");
})

console.log("Port 4000")
app.listen(4000);