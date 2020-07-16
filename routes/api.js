var fs = require('fs');

var mongoose = require('mongoose');

var mongooseURL = process.env.MONGODB_URI;
var username = process.env.USERNAME;
var password = process.env.PASSWORD;

mongoose.connect(`mongodb://database:27017`, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = function(app) {

	var saveSchema = new mongoose.Schema({
		id : String,
		data : Object
	});

	var save = mongoose.model('save', saveSchema);

	app.post("/save", (req,res) => {
		var random =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString();
		});
		req.on('end', () => {
			var data = JSON.parse(body);

			if(data.listId) {
				var list = data.listId.replace("?listId=","");
				var query = {
					id: list
				};
				save.findOneAndUpdate(query, { $set: {
					data: data
				}}, {useFindAndModify: false}, () => {
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({code: list}));
				})
			} else {
				var newSave = new save({
					id: random,
					data: body
				});
				newSave.save(function (err, newSave) {
					if (err) {
						return console.log(err);
					}
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify({code: random}));
				});
			}
		});
	});

	app.get("/get-data", (req,res) => {
		var file = req.query.listId;
		save.find({
			id: file
		}, (err, data) => {
			if (err) {
					console.log(err);
			}
			if (data.length < 1) {
				res.setHeader('Content-Type', 'application/json');
				res.send({});
			}
			if (data.length > 0) {
				res.setHeader('Content-Type', 'application/json');
				res.send(data[0].data);
			}
		});
	});

	app.get("/delete", (req,res) => {
		res.send()
	});

};