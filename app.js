const express = require('express');
const app = express();

require('dotenv').config()

const port = process.env.PORT || 3000;

app.set("view engine","ejs");
app.use(express.static("public"));

var api = require('./routes/api')(app);

app.get("/", (req,res) => {
    res.render('index');
});

app.get("*", (req,res) => {
	res.render('404');
});

app.listen(port, () => {
	console.log(`SERVER IS RUNNING ON PORT ${port}!`);
});
