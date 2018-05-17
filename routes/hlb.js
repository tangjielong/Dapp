var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('hlb', { title: '活力口袋' });
});


module.exports = router;