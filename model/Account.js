const mongoose = require("mongoose");

//Model k uložení a prácí s uživateli v databázi

const AccountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }

});


module.exports = Account = mongoose.model("account", AccountSchema)