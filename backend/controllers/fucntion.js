const User = require("../models/user");
const transac = require('../models/transactions');
const topup = require('../models/topup');

const codeused = require('../models/topuped');

// function transfer
exports.transfer = (req, res ,next) => {
  const ctmAcc = req.body.Account;    // รับค่า Account ที่จะโอนเงินไป
  const oldAcc = req.body.accountts;  // account ปัจจุบันที login ทำการโอนเงิน
  const tamount = req.body.amount;    // จำนวนเงินที่โอน
  // console.log('aa',ctmAcc);
  User.findOne({ account: ctmAcc }).then(result => {    // หา account ที่จะส่งไปใน db อยู่ใน User collection
    if(!result && result.account == oldAcc)   // ไม่มีใน db หรือ ซ้ำกับ account ที่ login
    {
      return res.status(404).json({message: 'No account'})    // return กลับ
    } else {
      result.balance = result.balance + tamount;    // ให้ balance ของ account ที่จะโอนทำการบวกเงินเพิ่ม
      result.save().then( update => {   // save ลง db
        console.log(update.balance);
      })

    }
  })
  User.findOne({ account: oldAcc }).then( old => {    // หา account ที่ login ใน db
    old.balance = old.balance - tamount;    // ทำการลบเงินออกจากบัญชี
    old.save().then( newb => {    // save ลง db
      res.status(201).json()
      console.log(newb.balance);
    })
  })
  const addtrans = new transac({    // ส่วนของเพิ่มใน transaction collection
    typeT: req.body.typeT,        // type การทำรายการ
    amount: req.body.amount,      // จำนวนเงิน
    account: req.body.Account,    // ไปยัง account นี้
    accountts: req.body.accountts,    // จาก account นี้
    created: Date.now()     // วันเวลาปัจจุบัน
  })
  addtrans.save().then( result => {   // save ลง db
    console.log(result.typeT);
  })
  transac.find({ accountts: req.body.accountts }).then( result => {   // เรียกเช็คดูเฉยๆว่า transaction มันเข้ามั้ย
    console.log(result);
  })

}

// function topup
exports.topup = (req ,res, next) => {
  const oldAcc = req.body.Account;    // รับค่า account ปัจจุบัน
  const redeemcode = req.body.code;   // รับค่า code

  topup.findOne({recode: redeemcode}).then(result => {    // หา code ใน topupcollection
    if(!result){        // ไม่มี return กลับ
      return res.status(404).json({ message: 'This code cant use'});
    }
    this.getValue = result.amount;    // เอา getvalue มาเก็บค่าของจำนวนเงินของ code นั้น
    console.log('topup'+this.getValue)
    result.recode = result.recode + 'used'    // เปลี่ยนค่า code ให้มันใช้อีกรอบไม่ได้
    result.save()       // save ลง db
    // console.log(getValue)

  })
  const addtrans = new transac({    // สร้าง transaction ใหม่
    typeT: req.body.typeT,
    amount: this.getValue,
    account: '-',
    accountts: oldAcc,
    created: Date.now()
  })
  addtrans.save().then( result => {
    console.log(result);
  })
  User.findOne({account: oldAcc}).then( results => {      // หา account ใน user collection
    console.log('results'+ results.balance)
    results.balance = results.balance + this.getValue;    // บวกเงินเพิ่มในบัญชี
    console.log('user'+ results.balance)
    results.save().then(getbalance => {     // save
      console.log(getbalance.balance)
      res.status(201).json({ balanced: getbalance.balance, message: 'Topup Success'})   // ส่งค่ากลับไปหน้าเว็ปส่ง balanced ไปให้มันอัพเดทค่าใน localstorage
    })
  })
}
