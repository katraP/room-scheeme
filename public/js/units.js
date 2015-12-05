/**
 * Created by Kateryna_Porkhun on 12/4/2015.
 */
function ajaxCall(config, callback) {

	var xobj = new XMLHttpRequest();
	var json = JSON.stringify(config);
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
			container = document.querySelector(MAIN.config.floorWrap);
	loader.setAttribute('class','spinner-loader');
	loaderContainer.setAttribute('class', 'spinner-wrap');
	loaderContainer.appendChild(loader);
	container.insertBefore(loaderContainer, svgArea);
}
function removeLoader(){
	var loaderContainer = document.querySelector('.spinner-wrap'),
			container = document.querySelector(MAIN.config.floorWrap);
	container.removeChild(loaderContainer);
}

/**
 * constructor for parts of widget
 * @param o - configuration data
 * @returns {Element}
 */
function buildElement(o){
	var el = document.createElement(o.tag);
	var elClassname= o.class || '',
			elHtml= o.html||'';

	el.setAttribute('class', elClassname);
	el.innerHTML= elHtml;
	return el;
}