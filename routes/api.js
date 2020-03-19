var fs = require('fs');

module.exports = function(app) {

    app.post("/save", (req,res) => {
        var random =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString();
		});
		req.on('end', () => {
			console.log(body);
			var re = /\?[^&?]*?=[^&?]*/;
			if (JSON.parse(body).listId) {
				console.log('has listid');
				console.log(JSON.parse(body).listId);
				var listId = JSON.parse(body).listId.match(re) || JSON.parse(body).listId;
			}
			if (listId) {
				console.log('has id');
				console.log(listId);
				var listId = listId[0].replace("?listId=","");
			}
			if (listId) {
				console.log(listId);
				random = listId;
			}
			fs.writeFile(`./saved-configs/${random}.json`, body, function(err) {
				if(err) {
					return console.log(err);
				}
			
				res.setHeader('Content-Type', 'application/json');
				res.end(JSON.stringify({code: random}));
			});
		});
    });

    app.get("/get-data", (req,res) => {
        console.log(req.query.listId);
        var file = req.query.listId;
        fs.readFile(`./saved-configs/${file}.json`, 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            };
            res.write(data);
            res.end();
        });
    });

    app.get("/delete", (req,res) => {
        res.send()
    });

};