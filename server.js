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

		if(pathname == '/favicon.ico') return;
		console.log('Request for ===>'+ pathname +' received.');

		/*
		移除对postData的处理以及 request.setEncoding 
		（这部分node-formidable自身会处理），
		转而采用将request对象传递给请求路由的方式
		 */
		route(handle, pathname, request, response); //根据请求的不同，有不同的响应，所以传递"response"到“路由总控”中
	}

	http.createServer(onRequest).listen(8888);
	console.log('Server has started.Port is 8888.');
}

exports.start = start;