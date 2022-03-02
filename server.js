const express = require('express');
const keys = require('./config/keys.js');
const app = express();
const bodyParser = require('body-parser');
var cors = require('cors');  

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors({origin: 'http://localhost:8080'}));


const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

app.get("/", (req, res)=>{

    res.send("Zdarec");
})

require('./model/Account.js');


require('./routes/authenticationRoutes')(app);

app.listen(keys.port, () => {
    console.log("Listening on " + keys.port);
});
