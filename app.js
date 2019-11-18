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

http.createServer(function (req, res) {
	var url = req.url;

	if (req.method === 'POST' && req.url === '/saveData') {
		console.log('POST');
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString();
		});
		req.on('end', () => {
			fs.stat('./saved-configs/test.json', function(err, stats) {
				if (!stats) {
					fs.writeFile('./saved-configs/test.json', body, function(err) {
		
						if(err) {
							return console.log(err);
						}
					
						res.write('<h1>api call worked</h1>')
						res.end();
					}); 
				}
			});
		});
	}
	
	var re = /\?[^&?]*?=[^&?]*/;
	var url = url.replace(re, '');

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
		case '/contact':
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write('<h1>contact us page</h1>');
			res.end();
			break;
		case '/get-data':
			fs.readFile('./saved-configs/test.json', 'utf8', (err, data) => {
				if (err) {
					console.log(err);
				};
				var json = JSON.parse(data);
				res.write(`<h1>Printed important data<h1>${json.name}`);
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