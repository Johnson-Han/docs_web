var express = require('express');
var router = express.Router();
var pg1 = require('./pgconn');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('lfcontact', { title: "TMSR-Documents LF1工作联系单" });
});

router.get('/:post_name', function (req, res, next) {
  // console.log(req.params)
  sql = 'select * from  param_requirement where name= \'' + req.params.post_name + '\';';
  console.log(sql);
  pg1.query(sql, function (result) {

    console.log(result.rows);
    //res.render('page_contact', { title: req.params.post_name });
    res.jsonp(result.rows);
  });

})


module.exports = router;
