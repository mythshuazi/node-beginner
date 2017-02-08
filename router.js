function route(handle, pathname, response, postData){
	if(pathname == '/favicon.ico') return;	
	console.log("About to route a request for ===>" + pathname);

	if(typeof handle[pathname] === 'function') {  //如果针对此pathname的“路由方法”存在
		handle[pathname](response, postData);
	}else{
		console.log("No request handler found for ===>" + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"})
		response.write("404 Not found");
		response.end();
	}
	console.log("\r\n");
}

exports.route = route;