/**
 * Created by Kateryna_Porkhun on 11/25/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.post('/', function(req, res){
	var reqJson = req.body;
	fs.readFile('workers.json', function(err, data) {
		if(err){
			res.statusCode = 404;
			res.statusMessage="Bad request";
		}
		else {
			var resJson = JSON.parse(data);
			resJson['floor'].forEach(function(element){
				if(element['id']==reqJson['floor']){
					res.setHeader('Content-Type', 'application/json');
					res.send(JSON.stringify(element));
				}
			});
		}
	});
});


app.listen(3000);
