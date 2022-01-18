const mongoose = require("mongoose");

const accessobj = new mongoose.Schema({
  token_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tokens",
  },

  accessed_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attackers",
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("TokenAccess", accessobj);
