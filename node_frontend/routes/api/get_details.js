const express = require("express");
const mongoose = require("mongoose");
const Attacker = require("../../models/Attacker");
const router = express.Router();
const url_db =
  "mongodb+srv://cicaf2021:Counterintelligenceattack2021@cluster0.vscuv.mongodb.net/CounterAttackdb?retryWrites=true&w=majority";
mongoose.connect(url_db, (err) =>
  err ? console.log(err) : console.log("[+] connected to mongo")
);

router.get("/", (req, res) => {
  Attacker.find({}).exec((err, result) => {
    if (err) console.log(err);
    else {
      console.log(result);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(result);
      res.end();
    }
  });
});

module.exports = router;
