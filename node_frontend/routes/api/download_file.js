const express = require("express");
const router = express.Router();

router.get("/:session/test.exe", (req, res) => {
  console.log(req.params.session);
  res.download("./to_download_excel/test.exe");
});

router.get("/persistant_ping.exe", (req, res) => {
  res.download("./to_download/persistant_ping.exe");
});
module.exports = router;
