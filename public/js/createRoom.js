/**
 * Created by Kateryna_Porkhun on 11/23/2015.
 */
(function(o){
	var parentObj = o;
	o.CreateRoom = function(){};
	o.CreateRoom.prototype.init = function(o){

		// getting configuration

		var config = this.configure(o);
		//defining room parts

		this.room=config.s.path(config.roomPath)
				.attr({
					fill: config.roomFill,
					stroke:config.stroke,
					cursor: 'pointer'
				}).addClass('room');

		this.roomNumber = config.s.text(config.textOffsetX,config.textOffsetY, config.number)
				.attr({fill:config.roomNumberStroke,
					'font-size':config.roomNumberSize,
					cursor: 'pointer'}
		).addClass('roomNumber');

		//adding active class if we searched for worker

		if(config.active) {
			this.room.addClass('active');
			this.roomNumber.addClass('active');
		}

		//getting the group of room parts
		this.group = config.s.group( this.room, this.roomNumber);

		//adding hover handler
		this.roomHover(o.worker);
	};

	o.CreateRoom.prototype.getNewStyle = function(o){
		o.obj.animate(o.styles, o.duration);
	}

	o.CreateRoom.prototype.roomHover = function(o){
		var self = this;
		self.group.hover(function(){
				self.getNewStyle({
					obj: self.room,
					styles: {fill: self.config.hoverFill},
					duration: self.config.hoverDuration
				});
			self.getNewStyle({
				obj: self.roomNumber,
				styles: {fill: self.config.hoverRoomNumber},
				duration: self.config.hoverDuration
			});

			parentObj.worker.clean();
			parentObj.worker.init(o);
			}, function(){
				self.getNewStyle({
					obj: self.room,
					styles: {fill: self.config.roomFill},
					duration: self.config.hoverDuration
				});
				self.getNewStyle({
					obj: self.roomNumber,
					styles: {fill: self.config.roomNumberStroke},
					duration: self.config.hoverDuration
				});
			})
	}
	o.CreateRoom.prototype.configure = function(o) {
		 this.config = {
			 s : o.space,
			 roomPath: o.room.path,
			 roomFill : o.room.style.fill,
			 stroke: o.room.style.stroke,
			 hoverScale: o.room.style.hoverScale,
			 hoverDuration : o.room.style.hoverDuration,
			 hoverFill : o.room.style.hoverFill,
			 hoverOpacity : o.room.style.hoverOpacity,
			 textOffsetX : o.roomNumber.offsetX,
			 textOffsetY : o.roomNumber.offsetY,
			 number : o.roomNumber.text,
			 roomNumberStroke : o.roomNumber.style.stroke,
			 roomNumberSize : o.roomNumber.style.size,
			 hoverRoomNumber: o.roomNumber.style.hoverFill,
			 active: o.isActive
		 }
		return this.config;
	}
}(MAIN));
