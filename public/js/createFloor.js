/**
 * Created by Kateryna_Porkhun on 11/23/2015.
 */
(function(o){
	o.CreateFloor = function(){};

	o.CreateFloor.prototype.init = function(floor, workplace){
		var s=Snap('#room-space');

		//Create floor
		var i= 0, length = floor.workers.length;
		for(i; i< length; i++) {
			var createRoom = new o.CreateRoom(),
				currentData = floor.workers[i];
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
			createRoom.init(configuration);

		}
	};
}(MAIN));

