/**
 * Created by Kateryna_Porkhun on 11/27/2015.
 */
(function(o){
	var f = function(){
		function ajaxCall(message,callback){
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '/', true);
			xhr.setRequestHeader('content-type', 'application/json; charset=utf-8');
			var json = JSON.stringify({
				input: message
			});
			xhr.onreadystatechange = function(){
				if(this.status=='200' && this.readyState==4){
					callback(this.responseText);
				}
			}
			xhr.send(json);
		}
		this.init = function(){
			var self = this;
			var el = document.createElement('input');
			el.setAttribute('class','main__floor-search');
			el.setAttribute('placeholder', 'Enter the name');
			el.addEventListener('keyup', function(e){
				self.keyUp(e,this);
			});
			document.querySelector('.main-title-wrap').appendChild(el);
		};
		this.keyUp = function(e, el){
			var inputValue = el.value;
			if(inputValue.length >2 && e.keyCode==13 ) {
				ajaxCall(inputValue,  function(response){
					if(typeof response == 'string') {
						var data = JSON.parse(response),
							floor = data.split('.')[0],
							workplace = data.split('.')[1],
							floorWidget = document.querySelector('.main-floor'),
							floorWidgetTitle = floorWidget.querySelector('.main-floor__title'),
							floorWidgetList = floorWidget.querySelector('.main-floor-list'),
							actFloor = floorWidgetList.getElementsByTagName('div');
						o.floorSelect.renderTitle(floorWidgetTitle, floor);
						o.floorSelect.selectFloor(floorWidgetList, actFloor[(floor-1)]);
						o.floorSelect.cleanSpace(floor);
						createArea(floor, workplace);
					}
					else {
						console.log('error');
					}
				});
			}

		}
	};
	var searchField = new f();
	searchField.init();
}(MAIN));