const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
   url: {
       type: String,
       required: true,
   },
   index: {
       type: Number,
       required: true,
       unique: true
   },
   keepAmount: {
       type: Number,
       required: true
   },
   deleteAmount: {
       type: Number,
       required: true
   },
   deleteReasonOne: {
       type: Number,
       required: true
   },
   deleteReasonTwo: {
       type: Number,
       required: true
   },
   deleteReasonThree: {
       type: Number,
       required: true
   },

})

module.exports = Account = mongoose.model("post", PostSchema)