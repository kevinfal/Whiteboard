const express = require("express");
const app  = express();
const { readFile, writeFile, } = require('fs').promises;
const bodyParser = require("body-parser");
var cors = require("cors");
const fs = require('fs');
//COnfigure body-parser
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
        res.send("www pog");
});
app.get("/load", async (req, res) => {
    console.log("loading");
    var data = fs.readFileSync('./files/file.json');
    console.log(data);
    res.send(data);
    //res.send("www pog");
});
//Handle POST request from app and save, write to json file using request data
app.post('/save', async (req,res) => {
    //console.log(typeof JSON.stringify(req.body));
    try {
        //request comes in as json already, make to string and write
        var content = JSON.stringify(req.body);
        await writeFile('./files/file.json', content);
    } catch (err) {
        console.log(err);
    }
    res.send("saved");
});

//Handle load

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));