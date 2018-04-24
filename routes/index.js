var express = require('express');
var router = express.Router();
var multer = require('multer');
var pg2 = require('./pgconn');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TMSR-Documents 核能文档管理系统' });
});


router.get('/lf1_primary', function(req, res, next) {
  res.render('lfprimary', { title: 'TMSR-Documents  LF1初步设计文件' });
});

router.get('/lfprimary/?fileindex', function (req, res, next) {
  res.render('page_lf_primary', { file_name: req.params.fileindex});
});

router.get('/lf1_note', function(req, res, next) {
  res.render('lfnote', { title: 'TMSR-Documents  LF1技术联系单' });
});

router.get('/add_new_contact', function (req, res, next) {
  // console.log(req.params)
  res.render('lfnewcontact');
})

//按钮补充联系单的路由
router.get('/add_new_subject/:contact_name', function (req, res, next) {
  // console.log(req.params)
  res.render('lfnewsubject', {title: req.params.contact_name});
})

//按钮回复联系单的路由
router.get('/add_reply/:contact_name', function (req, res, next) {
  // console.log(req.params)
  res.render('lfcontactreply', { title: req.params.contact_name }, function (err, html) {
    console.log(err);
  });
})



//工作联系单的保存路径
var storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      
      cb(null, process.cwd()+"/public/files/lf1/工作联系单");    // 保存的路径，备注：需要自己创建
     },
    filename: function (req, file, cb) {
      // 将保存文件名设置为 时间戳+字段名 ，比如 1478521468943-技术需求
      //  filename2=file.originalname;
      //  filedate=Date.now();
      //  filename1=filedate+'-'+filename2;
      cb(null, Date.now()+'-'+file.originalname);  
  }

});

//新建工作联系单
// var upload = multer({ dest: '/Users/hanlf/gitHub/docs_web/public/files' })
router.post('/lf_contact_add', multer({storage : storage1}).single('file'),function(req,res,next){
    console.log(req.body);
    console.log(req.file);
  // console.log(process.cwd());
    var upfdate=Date.now();
    var newDate = new Date();
    var localOffset = newDate.getTimezoneOffset() * 60000;
    
    newDate.setTime(upfdate+localOffset);
    var filepath ="/files/lf1/工作联系单/"+req.file.filename;
    
    var upftime = newDate.toISOString();
    
    sql='insert into param_requirement (subject,contact_from,contact_to,file_addr,name,re_sign_date,filename,note) values (\''+req.body.name+'\',\''+req.body.contact_from+'\',\''+req.body.contact_to+'\',\''+filepath+'\',\''+req.body.name+'\',\''+upftime+'\',\''+req.file.filename+'\',\''+req.body.note+'\')';


    console.log(sql);
    pg2.query(sql, function (result) {});
     Wurl = '/lfcontact/' + req.body.name;
    res.redirect(Wurl);

})

//补充联系单的添加路由
router.post('/lf_subject_add', multer({ storage: storage1 }).single('file'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  // console.log(process.cwd());
  var upfdate = Date.now();
  var newDate = new Date();
  var localOffset = newDate.getTimezoneOffset() * 60000;

  newDate.setTime(upfdate + localOffset);
  var filepath = "/files/lf1/工作联系单/" + req.file.filename;

  var upftime = newDate.toISOString();
  sql = 'insert into param_requirement (subject,contact_from,contact_to,file_addr,name,re_sign_date,filename,note) values (\'' + req.body.subject + '\',\'' + req.body.contact_from + '\',\'' + req.body.contact_to + '\',\'' + filepath + '\',\'' + req.body.name + '\',\'' + upftime + '\',\'' + req.file.filename + '\',\'' + req.body.note + '\')';


  console.log(sql);
  pg2.query(sql, function (result) { });
  Wurl = '/lfcontact/' + req.body.name;
  res.redirect(Wurl);

})

//回复联系单的添加路由
router.post('/lf_reply_add', multer({ storage: storage1 }).single('file'), function (req, res, next) {
  console.log(req.body);
  console.log(req.file);
  // console.log(process.cwd());
  var upfdate = Date.now();
  var newDate = new Date();
  newDate.setTime(upfdate);
  var filepath = "/files/lf1/工作联系单/" + req.file.filename;
  var upftime = newDate.toISOString();
  sql = 'insert into param_reply (subject,reply_from,file_addr,name,reply_date,filename,note) values (\'' + req.body.subject + '\',\'' + req.body.reply_from + '\',\'' + filepath + '\',\'' + req.body.name + '\',\'' + upftime + '\',\'' + req.file.filename + '\',\'' + req.body.note + '\')';


  console.log(sql);
  pg2.query(sql, function (result) { });
  Wurl = '/lfcontact/' + req.body.name;
  res.redirect(Wurl);

})

module.exports = router;
