/**
 * Created by Kateryna_Porkhun on 11/26/2015.
 */
(function(obj){
	var f = function(){
		var self = this;
		this.buildElement= function(o){
			var el = document.createElement(o.tag);
			var elClassname= o.class || '',
				elHtml= o.html||'';

				el.setAttribute('class', elClassname);
				el.innerHTML= elHtml;
			return el;
		}
		this.render = function(widgetConfig, parentContainer){
			var widgetContainer =this.buildElement({tag:'div', class:'main-floor'}),
				widgetTitle = this.buildElement({tag:'div', class:'main-floor__title', html:'floor '+ obj.config.currentFloor}),
				widgetSelectList = this.buildElement({tag:'div', class:'main-floor-list', value:''});
			widgetTitle.addEventListener('click', function(e){
				e.stopPropagation();
				widgetSelectList.classList.toggle('opened');
			});
			for(var i=1; i<= widgetConfig; i++){
				var widgetListItem = this.buildElement({tag:'div', class:'main-floor__item', html: 'floor '+(i)});
				if((i)== obj.config.currentFloor) {
					widgetListItem.classList.add('active');
				}
				(function(floor){
					widgetListItem.addEventListener('click', function(){
						widgetSelectList.querySelector('.active').classList.remove('active');
						this.classList.add('active');
						self.renderTitle(widgetTitle, floor);
						if(floor!= obj.config.currentFloor) {
							createArea(floor);
							obj.worker.clean();
							obj.config.currentFloor=floor;
						}
					});
				}(i));
				widgetSelectList.appendChild(widgetListItem);
			}


			widgetContainer.appendChild(widgetTitle);
			widgetContainer.appendChild(widgetSelectList);
			document.querySelector(parentContainer).appendChild(widgetContainer);
			document.body.addEventListener('click', function(){
				widgetSelectList.classList.remove('opened');
			});
		}

		this.init = function(o){
			this.render(o.numberOfFloor, o.parentContainer);
		};
		this.renderTitle = function(el, floor){
			el.innerHTML = 'Floor ' + floor;
		}
	}
	var floorSelect = new f();
	floorSelect.init({
		numberOfFloor: obj.config.totalNumberOfFloors, parentContainer: '.main-title-wrap'
	});
}(MAIN));
