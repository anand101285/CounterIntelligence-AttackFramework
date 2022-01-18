const express =  require('express');
const mongoose =  require('mongoose');
const router = express.Router();
const url_db = "mongodb+srv://cicaf2021:Counterintelligenceattack2021@cluster0.vscuv.mongodb.net/CounterAttackdb?retryWrites=true&w=majority"
mongoose.connect(url_db,(err)=>err? console.log(err): console.log("[+] connected to mongo"))


//models
const Attacker = require('../../models/Attacker');
const Token = require('../../models/Tokens');
const User = require('../../models/User');
const TokenAccess =  require('../../models/TokenAccess');

router.get('/tokenaccess/count',(req,res)=>{

    TokenAccess.find({},(err,docs)=>{
        let len = docs.length;
        res.send(JSON.stringify({num_of_access:len}))
    })
})

router.get('/tokens/all',(req,res)=>{
    Token.find({},(err,doc)=>{
        res.json(doc)
    })
})



module.exports = router;