const express = require('express');
const router = express.Router();


router.get('/test.exe',(req,res)=>{
    res.download("./to_download/test.exe");
})

module.exports = router;