var fs = require("fs");
var path = require("path");
var jshint = require("jshint");
var os = require("os");
var param = require("./param");


//解析需要遍历的文件夹
var filepath = path.resolve(process.argv[2]);
var outputPath = path.resolve(process.argv[3]);

fileDisplay(filepath);

/**
 * 遍历文件
 * @param filePath
 */
function fileDisplay(filePath){
    fs.readdir(filePath,function(err,files){
        if(err){
            // console.warn("遍历错误信息：" + err);
        }else{
            //遍历读取到的文件列表
            files.forEach(function(fileName){
                //获取当前文件的绝对路径
                var filedir = path.join(filePath,fileName);
                //根据文件路径获取文件信息，返回一个fs.status对象
                fs.stat(filedir,function(error,stats){
                    if(error){
                        console.warn("获取文件status失败");
                    }else{
                        var isFile = stats.isFile(); //判断是否是文件
                        if(isFile){
                            var strArrs = filedir.split(".");
                            if("js" === strArrs[strArrs.length-1]){
                                fs.readFile(filedir,{encoding:"utf8"},function(err,data){
                                    if(err){
                                        console.log("读取文件失败,文件路径为" + filedir);
                                    }else{
                                        jshint.JSHINT(data,param.options,param.predef);
                                        var result = jshint.JSHINT.data();
                                        if(result.errors && result.errors.length){
                                           // console.log("result",result);
                                            outputError(filedir,result.errors);
                                        }
                                    }
                                });

                            }
                        }else{
                            if(filedir.indexOf("plugins") > -1) return; //过滤掉公共库
                            fileDisplay(filedir); //递归调用，如果是文件夹，就继续遍历该文件夹下的文件
                        }
                    }
                });
            });
        }
    });
}

/**
 * 输出错误信息
 * @param filePath
 * @param errors
 */
function outputError(filePath,errors){

    var errorInfo = "【文件路径：" + filePath+"】"+os.EOL;

    errors.forEach(function(item){
        errorInfo += "第"+item.line+"行:"+ item.reason + os.EOL;
    });
    errorInfo += "【--------------------end--------------------------】" + os.EOL + os.EOL;

    fs.appendFile(outputPath,errorInfo);
}