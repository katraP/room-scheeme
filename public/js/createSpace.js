/**
 * Created by Kateryna_Porkhun on 11/23/2015.
 */
(function(o){
	o.CreateSpace = function(){};

	o.CreateSpace.prototype.init = function(floor){
		var s=Snap('#room-space');

		//Create floor
		var i= 0, length = floor.rooms.length;
		for(i; i< length; i++) {
			var createRoom = new o.CreateRoom();

			createRoom.init({
				room: {
					path: floor.rooms[i].path,
					style: o.config.style.room
				},
				roomNumber: {
					style: o.config.style.roomNumber,
					offsetX: floor.rooms[i].offsetX,
					offsetY: floor.rooms[i].offsetY,
					text: floor.rooms[i].number
				},
				floor: floor.id,
				space:s,
				worker: floor.rooms[i].worker
			});
		}
	};
}(MAIN));

