/**
 * Created by Kateryna_Porkhun on 11/27/2015.
 */
(function(o){
	var f = function(){
		var self = this;
		this.interval = null;
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
		function getWorkerList(arr){
			var list = document.createElement('ul');
			list.setAttribute('class', 'search-worker-list');
			if(arr.length>0){
				arr.forEach(function(el){
					var item = document.createElement('li');
					item.setAttribute('class', 'search-worker__item');
					item.setAttribute('data-id', el.id);
					item.innerHTML = el.name;
					item.addEventListener('click', function(e){
						createWorkerFloor(el.id);
						self.clean(this);
					});
					list.appendChild(item);
				});
			}
			else {
				var item = document.createElement('li');
				item.setAttribute('class', 'search-worker__item');
				item.innerHTML = 'No results for such request';
				list.appendChild(item);
			}
			return list;
		}
		function deleteWorkerList(el){
			var parent = el.parentNode,
				list = parent.getElementsByTagName('ul');
			if(list.length!=0) {
				parent.removeChild(list[0]);
			}
		}
		function createWorkerFloor(data) {
			var floor = data.split('.')[0],
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
		this.clean = function(el){
			if(el.tagName=='input') {
				el.value="";
			}
			else {
				el.parentNode.parentNode.querySelector('.search-field').value="";
			}
		}
		this.init = function(){
			var self = this;
			var wrap = document.createElement('div');
			wrap.setAttribute('class', 'search-wrap');
			var el = document.createElement('input');
			el.setAttribute('class','search-field');
			el.setAttribute('placeholder', 'Enter the name');
			el.addEventListener('keyup', function(e){
				self.keyUp(e,this);
			});
			el.addEventListener('blur', function(e){
				var list = this.parentNode.getElementsByTagName('ul');
				if(list.length) {
					setTimeout(function(){
						list[0].classList.add('--hide');
					}, 200)
				}
			});
			el.addEventListener('focus', function(){
				var list = this.parentNode.getElementsByTagName('ul');
				if(list.length) {
					list[0].classList.remove('--hide');
				}
			});
			wrap.appendChild(el);
			document.querySelector('.main-title-wrap').appendChild(wrap);
		};
		this.keyUp = function(e, el){
			var inputValue = el.value;
			clearTimeout(this.interval);
			if(inputValue.length >2  ) {
				if( e.keyCode==13) {
					//clean layout for rendering new information

					var list = el.parentNode.querySelector('ul');
					if(list){
						var workerData = list.firstChild.getAttribute('data-id');
						//render new info
						createWorkerFloor(workerData);
					}

					//clean searching info
					deleteWorkerList(el);
					self.clean(el);
				}
				else {
					this.interval = setTimeout(function(){
						ajaxCall(inputValue,  function(response){
							if(typeof response == 'string') {
								var data = JSON.parse(response);
									deleteWorkerList(el);
									var list = getWorkerList(data);
									el.parentNode.appendChild(list);
							}
							else {
								console.log('error');
							}
						});

					}, 500);
				}
			}
			else {
				deleteWorkerList(el);
			}

		}
	};
	var searchField = new f();
	searchField.init();
}(MAIN));