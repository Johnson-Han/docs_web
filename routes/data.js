var express = require('express');
var router = express.Router();
var pg1 = require('./pgconn');
var path = require('path')
var fs = require('fs')

//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */

function getFileList(path)
{
   var filesList = [];
   readFile(path,filesList);
   return filesList;
}

//遍历读取文件
function readFile(path,filesList)
{
   files = fs.readdirSync(path);//需要用到同步读取
   files.forEach(walk);
   function walk(file)
   {  
        states = fs.statSync(path+'/'+file);         
        if(states.isFile())
        // {
        //     readFile(path+'/'+file,filesList);
        // }
        // else
        {   
            //创建一个对象保存信息
            var obj = new Object();
            obj.size = states.size;//文件大小，以字节为单位
            obj.name = file;//文件名
            obj.path = path+'/'+file; //文件绝对路径
            obj.time = states.mtime;
            filesList.push(obj);
        }     
    }
}

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
  // fs.readdir("./public/files/TMSR-LF1工程/初步设计/01.设计输入参数",function(err,files){
    // console.log(files);
    filelist=getFileList("./public/files/TMSR-LF1工程/初步设计/01.设计输入参数");
    res.jsonp(filelist);
  });



module.exports = router;
