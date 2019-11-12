const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const transSchema = mongoose.Schema({
  typeT: { type: String, require: true},
  account: {type: String, require: true},
  amount: { type: Number, require: true},
  accountts: {type: String, require: true},
  create: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Transactions", transSchema);
