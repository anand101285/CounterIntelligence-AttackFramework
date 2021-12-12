const mongoose = require('mongoose');

const attackerobj = new mongoose.Schema({
    ip:String,
    date:String,
})

var attacker  = mongoose.model('Attacker',attackerobj);

module.exports = attacker