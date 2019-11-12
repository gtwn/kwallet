const trans = require('../models/transactions');
const User = require("../models/user");

exports.addTransaction = (req , res, next) => {
  // User.findOne({ account: req.body.Account }).then(acc => {
  //   console.log(acc);
  //   if(!acc) {
  //     return res.status(401).json({
  //       message: "No Account in Server"
  //     });
  //   }
  //   });
  const transaction = new trans({
    typeT: req.body.typeT,
    amount: req.body.amount,
    account: req.body.Account,
    accountts: req.body.accountts,
    created: created
  });
  transaction.save()
    .then(result => {
    res.status(201).json({
      message: result.typeT + "success"
    });
  })
  trans.find({}).then(result => {
    console.log(result)
  })
}

exports.showtrans = (req, res,next) => {

}
