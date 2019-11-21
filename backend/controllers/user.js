const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const trans = require('../models/transactions')

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      account: req.body.Account,
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
      balance: req.body.balance,
      transactions: req.body.transactions
    });
    console.log(user);
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          message: "Invalid authentication credentials!"
        });
      });
  });
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({ username: req.body.username })
    .then(user => {
      if (!user) {
        console.log(user);
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { username: fetchedUser.username,
          userId: fetchedUser._id,
          account: fetchedUser.account,
          balance: fetchedUser.balance,
          transactions: fetchedUser.transactions },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        account: fetchedUser.account,
        balance: fetchedUser.balance,
        transactions: fetchedUser.transactions
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Invalid authentication credentials!"
      });
    });
}

// ดึง profile
exports.getProfile = (req, res, next) => {
  User.findOne({account: req.params.account}).then(account => {   // หา account
    if(account){
      res.status(200).json(account);      // ส่งค่าทั้งหมดใน account กลับไป
    } else {
      res.status(404).json({  message: "No account in server!"});
    }
  });

}


// ดึง transaction ของบัญชี ยังไม่เสร็จ
exports.getTransaction = (req, res, next) => {
  trans.find({accountts: req.params.accountts}).then(transac => {
    if(transac){
      console.log(transac)
     return res.status(200).json({transac: transac});      // ต้องมีตัวแปรของหน้าเว็ปมารับค่า transaction ไปด้วยยังไม่ได้ทำ
    } else {
      return res.status(404).json({ message: "No transaction"});
    }
  })
}
