const express = require("express");
const ip = require("ip");
const mongoose = require("mongoose");
const router = express.Router();
const spawn = require("child_process").spawn;
const attacker = require("../../models/Attacker");
const url_db =
  "mongodb+srv://cicaf2021:Counterintelligenceattack2021@cluster0.vscuv.mongodb.net/CounterAttackdb?retryWrites=true&w=majority";
mongoose.connect(url_db, (err) => {
  if (err) console.log(err);
});

//models
const User = require("../../models/User");
const Token = require("../../models/Tokens");
const TokenAccess = require("../../models/TokenAccess");
const serverdata = require("./serverConfig");
const serverip = serverdata.url_toping;

router.post("/:type", (req, res) => {
  //getting the session id from front end user logged in

  let body = "";
  let sessionid;

  req.on("data", (chunk) => {
    console.log(` ${chunk}`);
    body += chunk;
  });
  req.on("end", async () => {
    let jsonbody = JSON.parse(body);
    sessionid = jsonbody.sessionid;

    if (req.params.type == "worddoc") {
      const current_ip = serverip;

      const newtoken = new Token({
        type: req.params.type,
        generated_by: sessionid,
      });

      newtoken.save((err, doc) => {
        if (err) console.log(err);
        else {
          User.findOneAndUpdate(
            { _id: sessionid },
            { $push: { tokens: doc._id } },
            (err, data) => {
              if (err) console.log(err);
              else {
                console.log("[+] data inserted");
                try {
                  let filename = "webbug_exploit";

                  const python = spawn("python", [
                    __dirname +
                      "\\..\\..\\..\\python_backend\\webdoc_using_link.py",
                    "--url",
                    current_ip,
                    "--sessionid",
                    doc._id,
                    "--docname",
                    filename,
                  ]);
                  python.stdout.on("data", (data) => {
                    console.log("Pipe data from python script ...");
                    dataToSend = data.toString();
                  });

                  //on error the message is displayed , python script was not findinf the proper directory
                  python.stderr.on("data", (data) => {

                    console.log(data.toString());
                  });

                  //on close of script
                  python.on("close", (code) => {
                    console.log(
                      `child process close all stdio with code ${code}`
                    );
                    res.download(__dirname + "\\..\\..\\webbug_exploit.doc");
                  });
                } catch (err) {
                  console.log(err.message);
                  res.status(500).send("Server Error");
                }
              }
            }
          );
        }
      });
    } else if (req.params.type == "excel_vba") {
      try {
        const current_ip = serverip;
        // let token_id = await insertTokenGeneratedData(req.params.type, sessionid);
        const newtoken = new Token({
          type: req.params.type,
          generated_by: sessionid,
        });

        newtoken.save((err, doc) => {
          if (err) console.log(err);
          else {
            User.findOneAndUpdate(
              { _id: sessionid },
              { $push: { tokens: doc._id } },
              (err, doc1) => {
                if (err) console.log(err);
                else {
                  const excel_vba = spawn("python", [
                    __dirname +
                      "\\..\\..\\..\\python_backend\\xslm_macrogen.py",
                    "--file",
                    "my_macro",
                    "--sessionid",
                    doc._id,
                    "--url",
                    current_ip,
                  ]);

                  //on execution
                  excel_vba.stdout.on("data", (data) => {
                    console.log("Pipe data from python script ...");
                    dataToSend = data.toString();
                  });

                  //on error the message is displayed , python script was not findinf the proper directory
                  excel_vba.stderr.on("data", (data) => {
                    console.log(data.toString());
                  });

                  //on close of script
                  excel_vba.on("close", (code) => {
                    console.log(
                      `child process close all stdio with code ${code}`
                    );
                    res.download(
                      __dirname +
                        "\\..\\..\\..\\python_backend\\mal_docs\\my_macro.xlsm"
                    );
                  });
                }
              }
            );
          }
        });
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
      }
    }
  });
});

//this route will recieve the request from document open
router.get("/ping/:tokenid", (req, res) => {
  let tokenid = req.params.tokenid;

  // let attacker_ip = res.socket.remoteAddress;
  let attacker_ip = req.headers["x-forwarded-for"];

  // //filtering only the ip address
  attacker_ip = attacker_ip.replace("::ffff:", "");

  let today = new Date();

  //getting the current date
  let currdate =
    today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();

  //saving in the database
  const attacker_detail = new attacker({
    ip: attacker_ip,
    date: currdate,
  });
  attacker_detail.save((err, doc) => {
    if (err) console.log(err);
    else {
      let new_tokenaccess = new TokenAccess({
        token_id: tokenid,
        accessed_by: doc._id,
      });

      new_tokenaccess.save((err, doc) => {
        if (err) console.log(err);
        else {
          console.log(doc);
        }
      });
    }
  });

  res.status(200).send();
});

module.exports = router;
