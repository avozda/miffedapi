const express = require('express');
const router = express.Router();
const Account = require("../model/Account")
const auth = require("../middleware/auth")
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');


// @route    GET /auth
// @desc     Najít uživatele z tokenu
// @access   Private
router.get('/', auth, async(req, res) => {
    try {
        const user = await Account.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

//@route    POST /auth/register
//@desc     Registrace
//@access   Public
router.post("/register", [
    check("name", "Name is required").not().isEmpty(),
    check("name", "Name must contain the maximum of 10 characters").isLength({ max: 10 }),
    check("email", "Please include an valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;

    try {
        // uživatel existuje?
        let user = await Account.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exists" }] })
        }
        user = new Account({
                name,
                email,
                password
            })
        // encrypt heslo
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        // jwt

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            "miffed", { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;

                res.json({ token });

            }
        )

    } catch (error) {
        console.error(error);
        res.status(500).send("server error")
    }
})


// @route    POST auth/login
// @desc     Ověřit uživatele a získát token
// @access   Public
router.post(
    '/login',
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await Account.findOne({ email });

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "miffed", { expiresIn: '5 days' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    }
);


module.exports = router;