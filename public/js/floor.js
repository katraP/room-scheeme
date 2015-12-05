/**
 * Created by Kateryna_Porkhun on 11/23/2015.
 */
(function(o){
	var f = function(){};

	f.prototype.init = function(floor, workplace){
		var s=Snap('#room-space');

		this.cleanArea(s);
		//Create floor
		floor.workers.forEach(function(el){
			var currentWorkplace = new o.workplace(),
					currentData = el;
			var configuration = {
				room: {
					path: currentData.room.path,
					style: o.config.style.room
				},
				roomNumber: {
					style: o.config.style.roomNumber,
					offsetX: currentData.room.offsetX,
					offsetY: currentData.room.offsetY,
					text: currentData.id.split('.')[1]
				},
				floor: floor.id,
				space:s,
				worker: currentData,
				markedWorkplace: workplace
			}
			if(workplace == configuration.roomNumber.text) {
				configuration.isActive = true;
				o.worker.clean();
				o.worker.init(configuration.worker);
			}
			currentWorkplace.init(configuration);
		});
	};
	f.prototype.cleanArea = function(area){
		area.selectAll('g').remove();
	}
	o.floor = new f();
}(MAIN));

