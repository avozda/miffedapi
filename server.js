const express = require('express');
const keys = require('./config/keys.js');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))



const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

app.get("/", (req, res)=>{
<<<<<<< HEAD
  
=======
>>>>>>> 33ffc2ae1558f3fd55eb4120e33560325fd9bece
    res.send("Zdarec");
})

require('./model/Account.js');


require('./routes/authenticationRoutes')(app);

app.listen(keys.port, () => {
    console.log("Listening on " + keys.port);
});
