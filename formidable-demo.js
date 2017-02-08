var formidable = require('formidable'),
	http = require('http'),
	util = require('util');

http.createServer(function(req, res){
	if(req.url == '/upload' && req.method.toLowerCase()=='post') {
		//parse a file upload
		var form = new formidable.IncomingForm();
		form.parse(req, function(err, fields, files){
			res.writeHead(200, {'content-type': 'text/plain'});
			res.write('received upload:\n\n');
			console.log(files.upload.path);
			res.end(util.inspect({fields: fields, file: files}));  //以字符串形式返回object对象的结构信息,方便调试
		});
		return;
	}
    /**
     * 上面 res.end 输出到浏览器的内容如下：
     * {  fields: { title: 'this picture of oasis' },
          files: 
           { upload: 
              File {
                domain: null,
                _events: {},
                _eventsCount: 0,
                _maxListeners: undefined,
                size: 55425,
                path: 'C:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\upload_ba990b8cc2c3b151b831a66eca7d342d',
                name: 'oasis.jpg',
                type: 'image/jpeg',
                hash: null,
                lastModifiedDate: 2017-02-07T08:26:00.639Z,
                _writeStream: [Object] 
              } 
           } 
        }
     */
    

	//显示文件上传表单
	res.writeHead(200, {'content-type':'text/html'});
	res.end(`
		<form action="/upload" enctype="multipart/form-data" method="post">
		<input type="text" name="title" /><br>
		<input type="file" name="upload" multiple="multiple" /><br>
		<input type="submit" value="Upload" />
		</form>
	`);
}).listen(8080);