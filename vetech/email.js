var emailer = require("nodemailer");
var path = require("path");
var param = require("./param");

var transporter = emailer.createTransport({
    service:"qq",
    auth:param.auth
});

var mailOptions = {
    from:"1130139617@qq.com",
    to:param.sendEmails.join(","),
    cc:param.ccEmails.join(","),
    subject:"cps业务代码检查报告",
    html:param.emailContent,
    attachments:getAttachments()
};

/**
 * 获取附件信息
 * @returns {Array}
 */
function getAttachments(){
    var attachments = [];
    for (var i = 0, len = param.outputPaths.length; i < len; i++) {
        var filePath = path.resolve(param.outputPaths[i]);
        attachments[i] = {
            filename:param.fileNames[i],
            path: filePath
        }
    }
    return attachments;
}

transporter.sendMail(mailOptions,function(err,info){
    if(err){
        console.log(err);
        return;
    }
    console.log("文件发送成功");
});