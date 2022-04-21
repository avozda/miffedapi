const express = require('express');
const router = express.Router();
const UserAnswer = require("../model/UserAnswers")
const auth = require("../middleware/auth")


//@route    POST api/answer
//@desc     Odpovědět
//@access   Private
router.post("/", auth, async(req, res) => {

   try {
       const newAnswers = new UserAnswer({
         user: req.user.id,
         reputation: req.body.reputation,
         answers: req.body.decisions
       })


       


       const answer = await newAnswers.save();
       res.json(answer)
   } catch (error) {
       console.error(error);
       res.status(500).send("Server error")
   }
})

module.exports = router;