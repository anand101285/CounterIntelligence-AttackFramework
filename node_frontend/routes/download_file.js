const express = require('express');
const router = express.Router();


router.get('/test.exe',(req,res)=>{
    res.download("./to_download/test.exe");
})

router.get('/persistant_ping.exe',(req,res)=>{
    res.download("./to_download/persistant_ping.exe");
})
module.exports = router;