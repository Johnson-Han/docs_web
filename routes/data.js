var express = require('express');
var router = express.Router();
var pg1 = require('./pgconn');
var path = require('path')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/lf1', function(req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql ="select * from doc_view order by \"order\"";
  pg1.query(sql, function (result) {
  res.jsonp(result.rows);
  // console.log(result.rows); 

  });

});

module.exports = router;
