const axios = require("axios");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const url_db =
  "mongodb+srv://cicaf2021:Counterintelligenceattack2021@cluster0.vscuv.mongodb.net/CounterAttackdb?retryWrites=true&w=majority";
mongoose.connect(url_db, (err) =>
  err ? console.log(err) : console.log("[+] connected to mongo")
);

//models
const Attacker = require("../../models/Attacker");
const Token = require("../../models/Tokens");
const User = require("../../models/User");
const TokenAccess = require("../../models/TokenAccess");

router.get("/tokenaccess/count", (req, res) => {
  TokenAccess.find({}, (err, docs) => {
    let len = docs.length;
    res.send(JSON.stringify({ num_of_access: len }));
  });
});

router.get("/tokens/:uid", (req, res) => {
  const userid = req.params.uid;
  Token.find({ generated_by: userid }, (err, doc) => {
    res.json(doc);
  });
});

router.get("/tokens/stats/:uid", (req, res) => {
  const userid = req.params.uid;
  Token.find({ generated_by: userid }, (err, doc) => {
    let word = 0;
    let excel = 0;
    Promise.all(
      doc.map((data) => {
        data.type === "worddoc" ? (word += 1) : (excel += 1);
      })
    ).then((result) => res.send({ docx: word, xlsm: excel }));
  });
});

router.get("/token/compromised/:uid", (req, res) => {
  const userid = req.params.uid;
  let tokenid = [];
  let accessed = 0;
  Token.find({ generated_by: userid }, async (err, doc) => {
    doc.map((data) => {
      tokenid.push(data.token_id);
    });
  });
  tokenid.map((data) => {
    TokenAccess.find({ token_id: data }, (err, docs) => {
      docs.map((data) => {
        accessed = accessed + 1;
        console.log("hello this is me ", accessed);
      });
      res.send(accessed);
    }).clone();
  });
});

router.get("/token/attacks", (req, res) => {
  let ips = [];
  Attacker.find({}, (err, docs) => {
    Promise.all(
      docs.map(async (data) => {
        let ax_res;
        ax_res = await axios({
          // url: `http://api.ipstack.com/${data.ip}?access_key=160b18bca9c1dfe3ef4b629f61c79f7e`,
          method: "GET",
        });
        ips.push([ax_res.data.longitude, ax_res.data.latitude]);
        console.log("this is the damn ips", ips);
        return 0;
      })
    ).then((result) => res.send(ips));
  });
});

module.exports = router;
