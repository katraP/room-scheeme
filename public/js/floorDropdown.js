/**
 * Created by Kateryna_Porkhun on 11/26/2015.
 */
(function(obj){
	var f = function(){
		var self = this;



		/**
		 * visual selecting of list item
		 * @param wrap - parent container
		 * @param el - selected element
		 */
		this.selectFloor = function(wrap,el){
			wrap.querySelector('.active').classList.remove('active');
			el.classList.add('active');
		}

		/**
		 * Creating list item
		 * @param obj - MAIN obj
		 * @param counter - counter of cycle
		 * @param floorList - object floor list
		 * @param floorTitle - object floor title
		 * @returns {Element} - floor list item
		 */
		this.createListItem = function(obj, counter, floorList, floorTitle){
			var widgetListItem = buildElement({tag:'div', class: MAIN.config.floorDropdownWrap+'__item', html: 'floor '+(counter)});
			if((counter)== obj.config.currentFloor) {
				widgetListItem.classList.add('active');
			}
			(function(floor){
				widgetListItem.addEventListener('click', function(){
					self.selectFloor(floorList, this);
					self.renderTitle(floorTitle, floor);
					if(floor!= obj.config.currentFloor) {
						createArea(floor);
						obj.worker.clean();
						obj.config.currentFloor=floor;
					}
				});
			}(counter));

			return widgetListItem;
		}
		this.init = function(o){
			this.render(o.numberOfFloor, o.parentContainer);
		};
		this.renderTitle = function(el, floor){
			el.innerHTML = 'Floor ' + floor;
		}
		this.render = function(widgetConfig, parentContainer){
			var widgetContainer =buildElement({tag:'div', class: MAIN.config.floorDropdownWrap}),
				floorTitle = buildElement({tag:'div', class: MAIN.config.floorDropdownWrap + '__title', html:'floor '+ obj.config.currentFloor}),
				FloorList = buildElement({tag:'div', class: MAIN.config.floorDropdownWrap + '-list', value:''});

			floorTitle.addEventListener('click', function(e){
				e.stopPropagation();
				FloorList.classList.toggle('opened');
			});

			for(var i=1; i<= widgetConfig; i++){
				var widgetListItem = this.createListItem(obj, i, FloorList, floorTitle);
				FloorList.appendChild(widgetListItem);
			}

			widgetContainer.appendChild(floorTitle);
			widgetContainer.appendChild(FloorList);
			document.querySelector(parentContainer).appendChild(widgetContainer);
			document.body.addEventListener('click', function(){
				FloorList.classList.remove('opened');
			});
		}

	}
	obj.floorSelect = new f();
	obj.floorSelect.init({
		numberOfFloor: obj.config.totalNumberOfFloors, parentContainer: MAIN.config.widgetWrap
	});
}(MAIN));
