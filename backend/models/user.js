const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  account: {type: String, require: true, unique: true},
  username: {type:String, require: true, unique: true},
  firstname: {type: String, require: true},
  lastname: {type: String, require: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: {type: Number, require: true},
  transactions: { type: String, require: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Customer", userSchema);
