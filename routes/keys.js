var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('keys', { title: '密钥' });
});


module.exports = router;