const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require("../middleware/auth")
const Post = require("../model/Post")


//@route    POST api/posts
//@desc     vytvořit příspěvek
//@access   Private
router.post("/", [auth, [
   check("url", "Url is required").not().isEmpty()
]], async(req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }

   try {
       const newPost = new Post({
           url: req.body.url,
           index: req.body.index,
           keepAmount: req.body.keepAmount,
           deleteAmount: req.body.keepAmount,
           deleteReasonOne: req.body.deleteReasonOne,
           deleteReasonTwo: req.body.deleteReasonTwo,
           deleteReasonThree: req.body.deleteReasonThree  
       })

       const post = await newPost.save();
       res.json(post)
   } catch (error) {
       console.error(error);
       res.status(500).send("Server error")
   }
})

//@route    GET api/posts
//@desc     najít všechny příspěvky
//@access   Private

router.get("/", auth, async(req, res) => {
   try {
       const posts = await Post.find().sort({ date: -1 });
       res.json(posts)
   } catch (error) {
       console.error(error);
       res.status(500).send("Server error")
   }
})


module.exports = router;