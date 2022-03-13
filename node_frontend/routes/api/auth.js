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
    const users = await Users.findById(req.users.id).select("-password");
    res.json(users);
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
    console.log(email, password);
    try {
      // see if user exists, send error if yes
      let users = await Users.findOne({ email });
      if (!users) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      console.log(" This is the fucking users", users);

      const isMatch = await bcrypt.compare(password, users.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // return json web token

      let token;
      try {
        token = jwt.sign(
          { userId: users.id, email: users.email },
          "Hiddentoken",
          { expiresIn: "1h" }
        );
      } catch (err) {
        return res.status(500).json({ errors: [{ msg: "Login Failed" }] });
      }

      res.json({
        userId: users.id,
        email: users.email,
        token: token,
      });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
