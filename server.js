var http = require('http');
var url  = require('url');

function start(route, handle){
	function onRequest(request, response){
		//域名端口 + pathname + 查询字符串
		var pathname = url.parse(request.url).pathname;
		var postData = "";

		if(pathname == '/favicon.ico') return;
		console.log('Request for ===>'+ pathname +' received.');
		
		request.setEncoding("utf8");
		
		request.addListener("data", function(postDataChunk){
			postData += postDataChunk;
			console.log(`Revieved POST data chunk '${postDataChunk}'.`)
		});

		request.addListener("end", function(){
			route(handle, pathname, response, postData);
		})
		
	}

	http.createServer(onRequest).listen(8888);
	console.log('Server has started.Port is 8888.');
}

exports.start = start;