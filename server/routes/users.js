const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const mysqlConex = require('../database')

router.get('/users', (req, res) => {
  mysqlConex.query('SELECT * FROM tb_users', (error, rows, fields) => {
    if (error)  throw error;
    const protectedUsers = rows.map((user) => {
      return {
        id: user._id,
        name: user.user_name,
        email: user.user_email,
        type: user.user_type,
        status: user.user_status,
      };
    });
    return res.json({protectedUsers, status: true})
  });
})

router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  mysqlConex.query('SELECT * FROM tb_users WHERE _id = ?', [id], (error, rows, fields) => {
    if (error)  throw error;
    
    rows.length > 0 ? (
      res.json(rows[0])
    ):(
      res.send('Not Result')
    )
  });
})

router.post('/user/add', async (req, res) => {
  const sql = 'INSERT INTO tb_users SET ?';
  const getpwd = req.body.pwd;
  const saltRounds = 10;
  const hpwd = await bcrypt.hash(getpwd, saltRounds);
  const userObj = {
    user_name: req.body.name,
    user_email: req.body.email,
    user_hashpwd: hpwd,
    user_pwd: req.body.pwd,
    user_type: req.body.type
  };

  mysqlConex.query(sql, userObj, error => {
    if (error) return res.json({status:false, msg:error});
    return res.json({status:true, msg:'Usuario creado satisfactoriamente'});
  });
});

router.put('/user/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, type } = req.body;
  const sql = `UPDATE tb_users SET user_name='${name}', user_email='${email}', user_type='${type}' WHERE _id =${id}`;

  mysqlConex.query(sql, error => {
    if (error) throw error;
    return res.send('User updated!');
  });
});

router.delete('/user/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM tb_users WHERE _id= ${id}`;

  mysqlConex.query(sql, error => {
    if (error) throw error;
    res.send('User deleted!');
  });
});

module.exports = router;