const express = require('express');
const router = express.Router();



router.get('/',(req,res)=>{

    print(res.socket.remoteAddress)
})
