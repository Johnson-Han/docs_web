var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('lfcontact', { title: "TMSR-Documents LF1工作联系单" });
});

router.get('/:post_name', function (req, res, next) {
  // console.log(req.params)
  sql = 'select * from  param_requirement where subject= \'' + req.params.post_name + '\';';
  console.log(sql);
  pg1.query(sql, function (result) {

    // console.log(result.rows[0].title);
    // console.log(result.rows[0].author);
    // console.log(result.rows[0].date);
    // console.log(result.rows[0].body);
    // // console.log(result.rows[1]);
    res.render('page_contact', { title: req.params.post_name });
    // console.log(result.rows[1]); 

  });

})


module.exports = router;
