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
	function addLoader(){
		var loader = document.createElement('div'),
			loaderContainer = document.createElement('div'),
			svgArea = document.querySelector('.vector-wrap'),
			container = document.querySelector('.floor-wrap');
		loader.setAttribute('class','spinner-loader');
		loaderContainer.setAttribute('class', 'spinner-wrap');
		loaderContainer.appendChild(loader);
		container.insertBefore(loaderContainer, svgArea);
	}
	function removeLoader(){
		var loaderContainer = document.querySelector('.spinner-wrap'),
			container = document.querySelector('.floor-wrap');
		container.removeChild(loaderContainer);
	}
	function createArea(floor) {
		var createSpace = new MAIN.CreateSpace();
		var floorObj = MAIN.cash.init(floor);
		if(typeof floorObj !='object') {
			addLoader();
			setTimeout(function(){
				loadJSON(floor, function(response){
					if(typeof response == 'string') {
						var data = JSON.parse(response);
						createSpace.init(data);
						MAIN.cash.write(data)
					}
				});
				removeLoader();
			}, 2000);
		}
		else {
			createSpace.init(floorObj);
		}
	}
