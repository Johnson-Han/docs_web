var express = require('express');
var router = express.Router();
var multer = require('multer');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TMSR-Documents 核能文档管理系统' });
});

router.get('/lf1_note', function(req, res, next) {
  res.render('lfnote', { title: 'TMSR-Documents  LF1技术联系单' });
});

router.get('/add_new_contact', function (req, res, next) {
  // console.log(req.params)
  res.render('lfnewcontact');
})


router.post('/lf_note_add',function(req,res,next){
  console.log(req.body);
  // var upload = multer({ dest: '/public/files/test/' });
  // upload.single('good')
  // res.send({ ret_code: '0' });
})

module.exports = router;
