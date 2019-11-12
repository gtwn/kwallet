const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const topupedSchema = mongoose.Schema({
  coded: {type: String, require: true, unique: true},
});

topupedSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Topuped", topupedSchema);
