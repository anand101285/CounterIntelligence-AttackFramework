const mongoose =require('mongoose');

const tokenobj =  new mongoose.Schema({
    type:String,
    created_at:{
        type:Date,
        required:true,
        default:Date.now,

    },
    generated_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

})

module.exports =  mongoose.model('Tokens',tokenobj);

