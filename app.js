/**
 * Created by Kateryna_Porkhun on 11/25/2015.
 */
var express = require('express');
var bodyParser = require('body-parser');
//var _ = require('lodash');
var fs = require('fs');
var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.post('/', function(req, res){
	var reqJson = req.body;
	if(reqJson.input) {
		fs.readFile('workers.json', function(err, data) {
			if(err){
				res.statusCode = 404;
				res.statusMessage="Bad request";
			}
			else {
				var resJson = JSON.parse(data),
					length = resJson['floor'].length;
				(function(){
					for(var i=0; i< length; i++ ){
						var el = resJson['floor'][i];
						for(var j= 0, floorLength =el.rooms.length ; j< floorLength; j++){
							var innerEl = el.rooms[j].worker.name;
							if(innerEl.toLowerCase()==reqJson.input.toLowerCase()) {
								res.setHeader('Content-Type', 'application/json');
								res.send(JSON.stringify(el.rooms[j]['id']));
								return ;
							}
						}
					}
					res.statusCode = 404;
					res.statusMessage="Bad request";
				}());
			}
		});
	}
	else {
		fs.readFile('workers.json', function(err, data) {
			if(err){
				res.statusCode = 404;
				res.statusMessage="Bad request";
			}
			else {
				var resJson = JSON.parse(data);

				var responseWorkplaces = resJson['workers'].filter(function(el){
					return el.id.split('.')[0] == reqJson.floor;
				});
				responseWorkplaces.forEach(function(el){
					var roomId = el.id;
					var roomInfo = resJson.rooms.filter(function(el){
						return el.id==roomId;
					});
					delete roomInfo[0]['id'];
					el.room = roomInfo[0];
				});
				var response = {
					id: reqJson.floor,
					workers: responseWorkplaces
				}
				console.log(response);
					res.setHeader('Content-Type', 'application/json');
					res.send(JSON.stringify(response));
			}
		});
	}
});


app.listen(3000);
