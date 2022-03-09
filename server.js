const express = require('express');
const keys = require('./config/keys.js');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');  

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({origin: 'http://localhost:8080'}));

app.use(express.json({ extended: false }))

const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

app.get("/", (req, res)=>{

    res.send("Zdarec");
})


app.use("/auth", require("./routes/authenticationRoutes"))
app.use("/post", require("./routes/postRoutes"))



app.listen(keys.port, () => {
    console.log("Listening on " + keys.port);
});
