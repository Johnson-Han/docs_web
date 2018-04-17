var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TMSR-Documents 核能文档管理系统' });
});

router.get('/lf1_note', function(req, res, next) {
  res.render('lf1_note', { title: 'TMSR-Documents  LF1技术联系单' });
});

router.get('/lfcontact', function (req, res, next) {
  res.render('lf1_contact', { title: "TMSR-Documents LF1工作联系单"});
});

module.exports = router;
