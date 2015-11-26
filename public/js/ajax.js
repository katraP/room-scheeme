/**
 * Created by Kateryna_Porkhun on 11/23/2015.
 */
	function loadJSON(config, callback) {

		var xobj = new XMLHttpRequest();
		var json = JSON.stringify({
			"floor": config
		});
		xobj.open('POST', '/', true);
		xobj.setRequestHeader('Content-type', 'application/json; charset=utf-8');
		xobj.onreadystatechange = function () {
			if (xobj.readyState == 4 && xobj.status == "200") {
				callback(xobj.responseText);
			}
		};
		xobj.send(json);
	}
	function ajaxCall(floor) {
		loadJSON(floor, function(response){
			if(typeof response == 'string') {
				var data = JSON.parse(response);
				var createSpace = new MAIN.CreateSpace();
				createSpace.init(data);
			}
		})
	}
