const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Users = require("../../models/Users");

//@route POST api/user
// @description Register User
// @access public

router.post(
  "/",
  [
    check("firstname", "Name is required").not().isEmpty(),
    check("lastname", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email address").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password } = req.body;
    try {
      // see if user exists, send error if yes
      let user = await Users.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new Users({
        firstname,
        lastname,
        email,
        password,
      });

      // encrypt the password

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // return json web token

      const payload = {
        user: {
          userId: user.id,
          email: user.email,
        },
      };

      jwt.sign(payload, "Hiddentoken", { expiresIn: 1800 }, (err, token) => {
        if (err) throw err;
        res.json({
          user: {
            f_name: user.firstname,
            l_name: user.lastname,
            userId: user.id,
            email: user.email,
          },
          token: token,
        });
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
