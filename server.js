var http = require('http');
var url  = require('url');

/**
 * [start 创建服务器函数]
 * @param  {[type]} route  [路由总控，根据不同地址调用不同方法]
 * @param  {[type]} handle [路由详细方法集合]
 */
function start(route, handle){
	function onRequest(request, response){
		var pathname = url.parse(request.url).pathname;  //域名端口 + pathname + 查询字符串
		var postData = "";  //请求数据

		if(pathname == '/favicon.ico') return;
		console.log('Request for ===>'+ pathname +' received.');
		
		request.setEncoding("utf8"); //将 request body 字符编码设置为"utf8"
		
		request.addListener("data", function(postDataChunk){  //接收请求的数据
			postData += postDataChunk;
			console.log(`Revieved POST data chunk '${postDataChunk}'.`)
		});

		request.addListener("end", function(){
			route(handle, pathname, response, postData); //根据请求的不同，有不同的响应，所以传递"response"到“路由总控”中
		})		
	}

	http.createServer(onRequest).listen(8888);
	console.log('Server has started.Port is 8888.');
}

exports.start = start;