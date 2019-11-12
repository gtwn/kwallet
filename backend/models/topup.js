const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const topupSchema = mongoose.Schema({
  recode: {type: String, require: true, unique: true},
  amount: { type: Number, require: true}
});

topupSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Topup", topupSchema);
