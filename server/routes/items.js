const express = require("express");
const router = express.Router();

const mysqlConex = require('../database')

router.get('/items', (req, res) => {
  mysqlConex.query('SELECT * FROM tb_items WHERE item_deleted = 0', (error, rows, fields) => {
    if (error)  throw error;
    return res.json({rows, status: true})
  });
})

router.post('/item/add', async (req, res) => {
  const sql = 'INSERT INTO tb_items SET ?';
  const itemObj = {
    item_category: req.body.category,
	  item_name: req.body.name,
	  item_description: req.body.description,
	  item_code: req.body.code,
	  item_stock: req.body.stock,
	  item_sellprice: req.body.sellprice,
	  item_discount: req.body.discount,
	  item_image: req.body.image,
  };

  mysqlConex.query(sql, itemObj, error => {
    if (error) return res.json({status:false, msg:error});
    return res.json({status:true, msg:'Articulo creado satisfactoriamente'});
  });
});

router.put('/item/update/:id', async (req, res) => {
  // const { id } = req.params;
  // const { name, email, pwd, type, status } = req.body;
  // var bolstatus = status === true ? 1 : 0  
  // const saltRounds = 10;
  // const hpwd = await bcrypt.hash(pwd, saltRounds);
  // const sql = pwd === "" ? (
  //   `UPDATE tb_users SET user_name='${name}', user_email='${email}', user_type='${type}', user_status='${bolstatus}' WHERE _id =${id}`
  // ) : (
  //   `UPDATE tb_users SET user_name='${name}', user_email='${email}', user_hashpwd='${hpwd}', user_pwd='${pwd}', user_type='${type}', user_status='${bolstatus}' WHERE _id =${id}`
  // );
  // mysqlConex.query(sql, error => {
  //   if (error) return res.json({status:false, msg:error});
  //   return res.json({status:true, msg:'Usuario actualizado satisfactoriamente'});
  // });
});

router.delete('/item/delete/:id', (req, res) => {
  // const { id } = req.params;
  // const sql = `UPDATE tb_users SET user_deleted=1 WHERE _id=${id}`;

  // mysqlConex.query(sql, error => {
  //   if (error) throw error;
  //   res.send('User deleted!');
  // });
});

module.exports = router;