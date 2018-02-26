var options = {
    "undef": true, //如果为真，JSHint会要求所有的非全局变量，在使用前都被声明。
    "expr":true, //允许应该出现赋值或函数调用的地方使用表达式
    "asi":false, //如果是真，JSHint会无视没有加分号的行尾
    "bitwise":true, //如果为真，JSHint会禁用位运算符
    "boss":false, //如果为真，那么JSHint会允许在if，for，while里面编写赋值语句。
    "curly":false, //JSHint会要求你在使用if和while等结构语句时加上{}来明确代码块。
    "debug":false, //如果为真，JSHint会允许代码中出现debugger的语句。不过建议你最好在检测代码前去掉debug的语句。
    "eqeqeq":false,//如果为真，JSHint会看你在代码中是否都用了===或者是!==，而不是使用==和!=。
    "eqnull":false, //如果为真，JSHint会允许使用”== null”作比较。
    "evil":false,//如果为真，JSHint会允许使用eval
    "forin":false, //如果为真，那么，JSHint允许在for in 循环里面不出现hasOwnProperty
    "immed":false, //匿名函数使用方式
    "laxbreak":true, //如果为真，JSHint则不会检查换行。
    "maxerr":10, //设定错误的阈值，超过这个阈值jshint不再向下检查，提示错误太多。
    "newcap":true,//如果为真，JSHint会要求每一个构造函数名都要大写字母开头。
    "noarg":false, //如果为真，JSHint会禁止arguments.caller和arguments.callee的使用
    "noempty":false,//如果为真，JSHint会禁止出现空的代码块（没有语句的代码块）
    "nomen":false, //如果为真，JSHint会禁用下划线的变量名。
    "onevar":true, //如果为真，JSHint期望函数只被var的形式声明一遍。
    "passfail":false,//如果为真，JSHint会在发现首个错误后停止检查。
    "plusplus":false, //如果为真，JSHint会禁用自增运算和自减运算
    "regexp":false,//如果为真，JSHint会要求所有的非全局变量，在使用前都被声明。
    "sub":true, //如果为真，JSHint会允许各种形式的下标来访问对象。
    "strict":false, //如果为真，JSHint会要求你使用use strict;语法。
    "white":false, //如果为true，JSHint会依据严格的空白规范检查你的代码。
    "browser":true,//暴露浏览器属性的全局变量，列如 window,document;
    "devel":true, //定义了全局变量,通常用于日志调试: console, alert等等
    "freeze":true,//禁止重写原生对象的原型列如 Array, Date等
    "jquery":true //这个选项定义全局暴露的jQuery库
};

//允许出现的未定义的全局变量
var predef = {
    define: true,
    $:true,
    layui:true,
    moment:true,
    document:true,
    Vue:true,
    layer:true,
    parent:true,
    window:true
};

/**
 * 要检查的脚本目录
 * @type {[string,string,string]}
 */
var filePaths = [
    "D:\\cn-vetech-center\\cn-vetech-center-cpsa-ui\\src\\main\\resources\\static",
    "D:\\cn-vetech-center\\cn-vetech-center-cpsb-ui\\src\\main\\resources\\static",
    "D:\\cn-vetech-center\\cn-vetech-center-cds-ui\\src\\main\\resources\\static"
];
/**
 * 输出报告的目录
 * @type {[string,string,string]}
 */
var outputPaths = ["E:\\cpsa.txt","E:\\cpsb.txt","E:\\cds.txt"];
var fileNames = ["cpsa系统脚本检查报告.txt","cpsb系统脚本检查报告.txt","cds系统脚本检查报告.txt"];
//发送者邮箱
var sendEmails =[
    "1130139617@qq.com"
];
//抄送者邮箱
var ccEmails =[
    "8888@qq.com"
];

var auth = {
    user:"1130139617@qq.com",
    pass:""
};

var emailContent = "<p>各位技术经理：</p>" +
    "<p style='text-indent: 25px;'>附件为A/B/D系统检查出来的脚本规范问题，虽然这些问题不影响系统功能，但是为了规避风险，提高代码的质量，请各位技术经理安排开发人员将附件中的问题限时解决，谢谢配合！另外，请前端组各位同事跟进一下修改进度。</p>" +
    "<p style='color: red;'>备注：该邮件由程序自动发送，若有疑问，请联系前端组，谢谢！</p>";


module.exports = {
    options:options,
    predef:predef,
    filePaths:filePaths,
    outputPaths:outputPaths,
    sendEmails:sendEmails,
    ccEmails:ccEmails,
    fileNames:fileNames,
    emailContent:emailContent,
    auth:auth
};