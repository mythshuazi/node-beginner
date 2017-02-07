//exec:以子进程方式执行一个命令的高级方法。
//所有输出经过缓冲后在同一个回调函数中返回。
var exec = require("child_process").exec;
var querystring = require("querystring");

//根据不同的请求地址，运行不同的函数
function start(response){
	console.log("Request handler 'start' was called.");

	//这是一个耗时的操作，但同时访问 upload 时，响应不受阻塞，
	//因为用的 exec 
	/*exec("find /", 
		{ timeout:10000, maxBuffer: 20000*1024 },
		function(error, stdout, stderr){
			response.writeHead(200, {"Content-Type": "text/plain"});
			response.write('stdout:'+stdout);
			response.write('stderr:'+stderr);
			response.end();
		});*/

	var body = `
	<html>
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		</head>
		<body>
			<form action="/upload" method="post">
			<textarea name="text" rows="20" cols="60"></textarea>
			<input type="submit" value="Submit text" />
			</form>
		</body>
	</html>	`

	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(body);
	response.end();
}

function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write(`You've sent: ${querystring.parse(postData).text}`);
	response.end();
}

exports.start  = start;
exports.upload = upload;