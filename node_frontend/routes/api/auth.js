const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const Users = require("../../models/Users");
//@route GEt api/auth
// @description Test route
// @access public
router.get("/", auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//@route POST api/user
// @description Authenticate user and get token
// @access public
router.post(
  "/",
  [
    check("email", "Please include a valid email address").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // see if user exists, send error if yes
      let user = await Users.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // return json web token
      const payload = {
        user: {
          userId: user.id,
          email: user.email,
        },
      };
      let token;
      try {
        token = jwt.sign(payload, "Hiddentoken", { expiresIn: 1800 });
      } catch (err) {
        return res.status(500).json({ errors: [{ msg: "Login Failed" }] });
      }

      res.json({
        user: {
          f_name: user.firstname,
          l_name: user.lastname,
          userId: user.id,
          email: user.email,
        },
        token: token,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
