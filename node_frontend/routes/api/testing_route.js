const express =  require('express');
const mongoose =  require('mongoose');
const router = express.Router();
const url_db = "mongodb+srv://cicaf2021:Counterintelligenceattack2021@cluster0.vscuv.mongodb.net/CounterAttackdb?retryWrites=true&w=majority"
mongoose.connect(url_db,(err)=>err? console.log(err): console.log("[+] connected to mongo"))


//models
const Attacker = require('../../models/Attacker');
const Token = require('../../models/Tokens');
const User = require('../../models/User');


router.post('/insert', (req,res)=>{
    let body="";
    req.on('data',(val)=>{
        body+=val;
    })
    req.on('end',()=>{
        console.log(body)
    })
    const user = new User({name:'anand',age:21,email:'and@mail.com',tokens:[]})

    
    user.save((err,doc)=>{
        let usersaved = doc._id;
        const token =  new Token( {type:'excel',generated_by:usersaved} )
        token.save((err,doc)=>{
            console.log(doc);
        })
    })
    
    res.end();
})



module.exports = router;