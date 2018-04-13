var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TMSR-Docs 核能文档管理系统' });
});
router.get('/tables.html', function(req, res, next) {
  res.render('tables', { title: 'TMSR-Docs 文档列表' });
});

module.exports = router;
