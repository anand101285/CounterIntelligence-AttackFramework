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

router.get("/tokens/:uid", async (req, res) => {
  const userid = req.params.uid;
  try {
    const data = await Token.find({ generated_by: userid });
    res.send(data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/tokens/stats/:uid", async (req, res) => {
  const userid = req.params.uid;
  let word = 0;
  let excel = 0;
  try {
    const tokendata = await Token.find({ generated_by: userid });
    console.log(tokendata);
    tokendata.map((data) => {
      data.type === "worddoc" ? (word += 1) : (excel += 1);
    });
    res.send({ docx: word, xlsm: excel });
  } catch (err) {
    console.log("this an error from /tokens/stats/uid", err);
  }
});

// router.get("/token/generated/:uid", (req, res) => {
//   const userid = req.params.uid;
//   const tokenid = [];
//   let accessed;
//   Token.find({ generated_by: userid }, async (err, doc) => {
//     doc.map((data) => {
//       tokenid.push(data.id);
//     });
//     tokenid.map((data) => {
//       console.log(data);
//       TokenAccess.find({ token_id: data }, async (err, docs) => {
//         console.log("found the token here", data);
//         console.log("this is the stupid token access id");
//         accessed = accessed + 1;
//         console.log("hello this is me ", accessed);
//         res.send(accessed);
//       });
//     });
//     res.send(accessed);
//   });
// });

router.get("/token/generated/:uid", async (req, res) => {
  const userid = req.params.uid;
  let accessed = 0;
  try {
    const tokenid = await Token.find({ generated_by: userid });
    Promise.all(
      tokenid.map(async (data) => {
        const token = await TokenAccess.findOne({ token_id: data.id });
        if (token != null) accessed += 1;
      })
    ).then((result) => res.send({ num_of_access: accessed }));
  } catch (err) {
    console.log("error from /token/generated/uid", err);
  }
});

router.get("/token/compromised/:uid", async (req, res) => {
  const userid = req.params.uid;
  let accessed = [];
  try {
    const tokenid = await Token.find({ generated_by: userid });
    Promise.all(
      tokenid.map(async (data) => {
        const token = await TokenAccess.findOne({ token_id: data.id });
        if (token != null) {
          const ip = await Attacker.findOne({ _id: token.accessed_by });
          if (ip != null) {
            accessed.push({ token_id: token.token_id, ip: ip.ip });
            console.log("the id here", token.id, " IP here", ip.ip);
          }
        }
      })
    ).then((result) => res.send(accessed));
  } catch (err) {
    console.log("error from /token/compromised/uid", err);
  }
});

// router.get("/token/compromised/:tokenid", (req, res) => {
//   const tokenid = req.params.tokenid;
//   let accessed = 0;
//   console.log("this is the array", tokenid);
//   tokenid.map((data) => {
//     TokenAccess.find({ token_id: data }, (err, docs) => {
//       console.log("There you are saber");
//       docs.map((data) => {
//         console.log("this is the stupid token access id");
//         accessed = accessed + 1;
//         console.log("hello this is me ", accessed);
//       });
//       res.send(accessed);
//     });
//   });
// });

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
