var http = require('http');
var fs = require('fs');

// SHOULD ALL BE A GENERIC JS FILE EXPORTING A SINGLE STRING
// COPY FOLLOWING FILES BEFORE LOADING:
// style.css > style.js
// index.html > index.js

var index = require('./index');
var style = require('./style');
var pre = '';
var post = '';
var dragPolyfill = '';

var selfReadFile = (fileName, string) => {
	fs.readFile(fileName, 'utf8', (err, data) => {
		if (err) {
			console.log(err);
		};
		string += data;
	});
}

fs.readFile('./pre.js', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
	};
	pre += data;
});

fs.readFile('./post.js', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
	};
	post += data;
});

fs.readFile('./DragDropTouch.js', 'utf8', (err, data) => {
	if (err) {
		console.log(err);
	};
	dragPolyfill += data;
});

http.createServer(function (req, res) {
	var url = req.url;

	if (req.method === 'POST' && req.url === '/saveData') {
		console.log('POST');
		var random =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		console.log(random);
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString();
			console.log(body);
		});
		req.on('end', () => {
			if (!fs.existsSync(`./saved-configs/${random}.json`)) {
				fs.writeFile(`./saved-configs/${random}.json`, body, function(err) {
					console.log(body);
					if(err) {
						return console.log(err);
					}
				
					res.write({code: random})
					res.end();
				});
			}
		});
	}
	
	var re = /\?[^&?]*?=[^&?]*/;
	var url = url.replace(re, '');
	var id = req.url.match(re);

	switch(url) {
		case '/':
			res.write("homepage");
			res.end();
			break;
		case '/list':
			res.write(index);
			res.end();
			break;
		case '/style.css':
			res.write(style);
			res.end();
			break;
		case '/pre.js':
			res.write(pre);
			res.end();
			break;
		case '/post.js':
			res.write(post);
			res.end();
			break;
		case '/DragDropTouch.js':
			res.write(dragPolyfill);
			res.end();
			break;
		case '/contact':
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write('<h1>contact us page</h1>');
			res.end();
			break;
		case '/get-data':
			var file = id[0].replace("?listId=","");
			fs.readFile(`./saved-configs/${file}.json`, 'utf8', (err, data) => {
				if (err) {
					console.log(err);
				};
				res.write(data);
				res.end();
			});
			break;
		default: 
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write('<h1>Error</h1>');
			res.end();
			break;
	}

	}).listen(3000, function(){
		console.log("server start at port 3000");
});