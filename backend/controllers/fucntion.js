const User = require("../models/user");
const transac = require('../models/transactions');
const topup = require('../models/topup');

const codeused = require('../models/topuped');


exports.transfer = (req, res ,next) => {
  const ctmAcc = req.body.Account;
  const oldAcc = req.body.accountts;
  const tamount = req.body.amount;
  // console.log('aa',ctmAcc);
  User.findOne({ account: ctmAcc }).then(result => {
    if(!result && result.account == oldAcc)
    {
      return res.status(404).json({message: 'No account'})
    } else {
      result.balance = result.balance + tamount;
      result.save().then( update => {
        console.log(update.balance);
      })

    }
  })
  User.findOne({ account: oldAcc }).then( old => {
    old.balance = old.balance - tamount;
    old.save().then( newb => {
      res.status(201).json()
      console.log(newb.balance);
    })
  })
  const addtrans = new transac({
    typeT: req.body.typeT,
    amount: req.body.amount,
    account: req.body.Account,
    accountts: req.body.accountts,
    created: Date.now()
  })
  addtrans.save().then( result => {
    console.log(result.typeT);
  })
  transac.find({ accountts: req.body.accountts }).then( result => {
    console.log(result);
  })

}


exports.topup = (req ,res, next) => {
  const oldAcc = req.body.Account;
  const redeemcode = req.body.code;
  let getValue;

  // codeused.findOne({ coded: redeemcode}).then(res => {
  //   console.log(res)
  //   if(res){
  //     console.log('faill')
  //     res.status(500).json({ message: "this code used"}) }
  //   // } else {
  //   //   topup.findOne({recode: redeemcode}).then(result => {
  //   //     if(!result){
  //   //       return res.status(404).json({ message: 'This code cant use'});
  //   //     }
  //   //     this.getValue = result.amount;
  //   //     console.log('topup'+this.getValue)
  //   //     // console.log(getValue)
  //   //     User.findOne({account: oldAcc}).then( results => {
  //   //       console.log('results'+ results.balance)
  //   //       results.balance = results.balance + this.getValue;
  //   //       console.log('user'+ results.balance)
  //   //       results.save().then(getbalance => {
  //   //         console.log(getbalance.balance)
  //   //         // res.status(201).json({ balanced: getbalance.balance})
  //   //       })
  //   //     })
  //   //     const addtrans = new transac({
  //   //       typeT: req.body.typeT,
  //   //       amount: this.getValue,
  //   //       account: '-',
  //   //       accountts: oldAcc,
  //   //       created: Date.now()
  //   //     })
  //   //     addtrans.save().then( result => {
  //   //       console.log('transaction'+result);
  //   //     })
  //   //     const newcodeused = new codeused({
  //   //       coded: redeemcode
  //   //     })
  //   //     newcodeused.save().then( result => {
  //   //       console.log('codeused'+result)
  //   //     })
  //   //     User.findOne({account: oldAcc}).then(result => {
  //   //       return res.status(200).json(
  //   //         {balanced: result.balance,
  //   //         message: 'Success'
  //   //         })
  //   //     })
  //   //   })
  //   // }
  // })

  topup.findOne({recode: redeemcode}).then(result => {
    if(!result){
      return res.status(404).json({ message: 'This code cant use'});
    }
    this.getValue = result.amount;
    console.log('topup'+this.getValue)
    result.recode = result.recode + 'used'
    topup.save()
    // console.log(getValue)

  })
  const addtrans = new transac({
    typeT: req.body.typeT,
    amount: this.getValue,
    account: '-',
    accountts: oldAcc,
    created: Date.now()
  })
  addtrans.save().then( result => {
    console.log(result);
  })
  User.findOne({account: oldAcc}).then( results => {
    console.log('results'+ results.balance)
    results.balance = results.balance + this.getValue;
    console.log('user'+ results.balance)
    results.save().then(getbalance => {
      console.log(getbalance.balance)
      res.status(201).json({ balanced: getbalance.balance, message: 'Topup Success'})
    })
  })
}
