/**
 * Created by Kateryna_Porkhun on 11/27/2015.
 */
(function(o){
	var f = function(){
		var self = this;
		this.interval = null;
		function getWorkerList(arr){
			var list = buildElement({tag:'ul', class: MAIN.config.searchWrap + '-list'});

			if(arr.length>0){
				arr.forEach(function(el){
					var item = buildElement({tag:'li', class: MAIN.config.searchWrap + '__item', html: el.name});
					item.setAttribute('data-id', el.id);
					item.addEventListener('click', function(e){
						debugger;
						createWorkerFloor(el.id);
						self.clean(this);
						deleteWorkerList(this);

					});
					list.appendChild(item);
				});
			}
			else {
				var item = buildElement({tag:'li', class: MAIN.config.searchWrap + '__item', html: 'No results for such request'});
				list.appendChild(item);
			}
			return list;
		}
		function deleteWorkerList(el){
			var list, wrap;
			if(el.tagName == 'LI') {
				list = el.parentNode;
				wrap = list.parentNode;
				wrap.removeChild(list);
			}
			else {
				wrap = el.parentNode;
				if(wrap.querySelector('ul')){
					list = wrap.querySelector('ul');
					list.remove();
				}
			}

		}

		/**
		 * return floor map and active worker workplace
		 * @param data - worker floor and number of workplace
		 */
		function createWorkerFloor(data) {
			var floor = data.split('.')[0],
					workplace = data.split('.')[1],
					floorWidget = document.querySelector('.'+ MAIN.config.floorDropdownWrap),
					floorWidgetTitle = floorWidget.querySelector('.'+MAIN.config.floorDropdownWrap+'__title'),
					floorWidgetList = floorWidget.querySelector('.'+ MAIN.config.floorDropdownWrap+'-list'),
					actFloor = floorWidgetList.getElementsByTagName('div');
			o.floorSelect.renderTitle(floorWidgetTitle, floor);
			o.floorSelect.selectFloor(floorWidgetList, actFloor[(floor-1)]);
			o.worker.clean();
			o.config.currentFloor=floor;

			createArea(floor, workplace);
		}
		this.clean = function(el){
			if(el.tagName=='input') {
				el.value="";
			}
			else {
				el.parentNode.parentNode.querySelector('.'+ MAIN.config.searchWrap + '-field').value="";
			}
		}
		this.init = function(){
			var self = this;
			var wrap = buildElement({tag:'div', class: MAIN.config.searchWrap + '-wrap'});
			var el = buildElement({tag:'input', class: MAIN.config.searchWrap + '-field'});
			el.setAttribute('placeholder', 'Enter the name');
			el.addEventListener('keyup', function(e){
				self.getWorkerList(e,this);
			});
			el.addEventListener('blur', function(e){
				var list = this.parentNode.getElementsByTagName('ul');
				setTimeout(function(){
					if(list.length) {
						list[0].classList.add('--hide');
					}
				}, 200)

			});
			el.addEventListener('focus', function(){
				var list = this.parentNode.getElementsByTagName('ul');
				if(list.length) {
					list[0].classList.remove('--hide');
				}
			});
			wrap.appendChild(el);
			document.querySelector(MAIN.config.widgetWrap).appendChild(wrap);
		};

		/**
		 * getting workers from server
		 * @param e - event object
		 * @param el - context of calling
		 */
		this.getWorkerList = function(e, el){
			var inputValue = el.value;
			clearTimeout(this.interval); // if user prints quickly, don't perform ajax call
			if(inputValue.length >2  ) {
				if( e.keyCode==13) {

					var list = el.parentNode.querySelector('ul');
					if(list){ // if worker list not empty, show info for first user in the list
						var workerData = list.firstChild.getAttribute('data-id');
						//render new info
						createWorkerFloor(workerData);
					}

					//clean worker suggest
					deleteWorkerList(el);
					//clean input value;
					self.clean(el);
				}
				else {
					this.interval = setTimeout(function(){
						ajaxCall({input: inputValue},  function(response){
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