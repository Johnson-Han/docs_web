var express = require('express');
var router = express.Router();
var pg1 = require('./pgconn');
var path = require('path')
var fs = require('fs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 获取初步设计文件目录视图数据
router.get('/lf1', function(req, res, next) {
  process.env.TZ = "Asia/Shanghai";
  sql ="select * from doc_view order by \"order\"";
  pg1.query(sql, function (result) {
  res.jsonp(result.rows);
  // console.log(result.rows); 

  });

});

router.get('/input_file', function(req, res, next) {
  fs.readdir("./public/files/TMSR-LF1工程/初步设计/01.设计输入参数",function(err,files){
    // console.log(files);
    res.jsonp(files);
  })
  


});



module.exports = router;
