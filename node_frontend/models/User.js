const mongoose =  require('mongoose');

const userobj =  new mongoose.Schema({
   fname:String,
   age:Number,
   email:String,
   tokens:[
      {
       type:mongoose.Schema.Types.ObjectId,
       ref:'Tokens'
      }
   ]
})

module.exports =  mongoose.model('Users',userobj);