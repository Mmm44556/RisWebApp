const express = require('express');
let router =express.Router();
const conn = require('../mysql');


router.get('/', (req, res) => {
  res.header('Cache-Control', 'no-store')
  // res.header('Content-type', 'application/json')
  
  conn.query(`select * from user`, (err, row) => {
    if (err) {
      res.status(403);
      res.json([]);
    }
    res.status(200);
    res.json(row);
  })
})

router.get('/:id', (req, res) => {
  res.header('Cache-Control', 'no-store')
  // res.header('Content-type', 'application/json')

  conn.query(`select * from user where user_id='${req.params.id}'`, (err, row) => {
    if (err) {
      res.status(403);
      res.json([]);
    }
    res.status(200);
    res.json(row);
  })
})
router.post('/register', (req, res) => {
  const { FirstName, LastName, email, confirmPassword, phone, gender, age } = req.body
  const name = FirstName.concat(LastName)
  conn.query(`insert into user(\`user_name\`, \`user_mail\`,\`user_password\`,\`user_phone\`,\`user_sex\`,\`user_age\`) values('${name}', '${email}', '${confirmPassword}','${phone}','${gender}','${age}')`, (err, rows) => {
    if (err) {
      res.status(409);
      console.log(err, req.body)
      if (/name/i.test(err.sqlMessage)) {
        res.send('名稱已被註冊過');
        return
      } else if (/mail/i.test(err.sqlMessage)) {
        res.send('信箱已被註冊過');
        return
      } else if (/phone/i.test(err.sqlMessage)) {
        res.send('電話已被註冊過');
        return
      }
      return
    }
    res.status(200)
    res.send('success');
  })
})

module.exports = router;