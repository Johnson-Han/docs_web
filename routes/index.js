var express = require('express');
var router = express.Router();
var multer = require('multer');
var pg1 = require('./pgconn');
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

var storage1 = multer.diskStorage({
  destination: function (req, file, cb) {
      
      cb(null, process.cwd()+"/public/files");    // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
      // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
      //  filename2=file.originalname;
      //  filedate=Date.now();
      //  filename1=filedate+'-'+filename2;
      
      cb(null, Date.now()+'-'+file.originalname);  
  }


});

// var upload = multer({ dest: '/Users/hanlf/gitHub/docs_web/public/files' })
router.post('/lf_note_add', multer({storage : storage1}).single('file'),function(req,res,next){
  console.log(req.body);
  console.log(req.file);
  // console.log(process.cwd());
  var upfdate=Date.now();
  var newDate = new Date();
  newDate.setTime(upfdate);
  
  var upftime=newDate.toISOString();
  sql='insert into param_requirement (subject,contact_from,contact_to,file_addr,name,re_sign_date,note) values (\''+req.body.name+'\',\''+req.body.contact_from+'\',\''+req.body.contact_to+'\',\''+req.file.path+'\',\''+req.body.name+'\',\''+upftime+'\',\''+req.body.note+'\')';

  console.log(upftime);

  console.log(sql);
  pg1.query(sql, function (result) {
    
    // console.log(result.rows); 
    Wurl='/lfcontact/'+req.body.name;
    res.redirect(Wurl);
    });


})

module.exports = router;
