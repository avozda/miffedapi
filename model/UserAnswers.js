const mongoose = require("mongoose");

const UserAnswerSchema = new mongoose.Schema({

   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "account"
   },
   toxicity:{
      type: Number,
      required: true
   },
   answers: [{
      post:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "post"
      },
      
      answer:{
         type: Boolean,
         required: true
      },

      reason: {
         type:String,
         required:false
      }
   
   }]

})

module.exports = UserAnswer = mongoose.model("useranswer", UserAnswerSchema)