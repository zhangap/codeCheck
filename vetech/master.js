/**
 * 代码检查程序入口
 * @author tengri
 */
const child_process = require("child_process");
var fs = require("fs");
var param = require("./param");

//记录线程执行的次数
var processRecords = 0;

//先清理已经生成的报告
clearFiles(param.outputPaths,function(){
    var command;
    for(var i =0, len = param.filePaths.length;i<len;i++){
        command = "node file.js " + param.filePaths[i] + " " + param.outputPaths[i];
        checkedCode(command,i);
    }

});

/**
 * 检查文件
 * @param command
 * @param processIndex
 */
function checkedCode(command,processIndex){
    console.log("进程"+processIndex+"开始执行");
    var workerProcess = child_process.exec(command, function (error) {
        if (error) {
           console.log("代码检查出错，线程ID:" + processIndex);
        }
    });

    workerProcess.on("exit",function(code){
        console.log("代码检查子进程"+processIndex+"已退出，退出码：" + code);

        processRecords +=1;
        if(processRecords === param.filePaths.length){
            console.log("开始发送邮件...");
            sendEmail();
        }
    });

}

/**
 * 发送邮件
 */
function sendEmail(){
    var emailCommand = "node email.js" ;

    var emailProcess =  child_process.exec(emailCommand,function(error){
        if(error){
            console.log("邮件发送出错:" + error);
        }
    });

    emailProcess.on("exit",function(code){
        console.log("邮件发送成功"+code);
    });
}

/**
 * 删除文件
 * @param paths
 * @param callback
 */
function clearFiles(paths,callback){

    var currIndex = 0;
    del(paths[currIndex]);

    /**
     * 删除文件的方法
     * @param path
     */
    function del(path){
        if(!path){
            callback();
        }else{
            fs.unlink(path,function(){
                currIndex+=1;
                del(paths[currIndex]);
            });
        }
    }

}







