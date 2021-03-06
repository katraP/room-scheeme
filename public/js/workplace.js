/**
 * Created by Kateryna_Porkhun on 11/23/2015.
 */
(function(o){
	var parentObj = o;
	var f = function(){};
	f.prototype.init = function(o){

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


		//getting the group of room parts
		this.group = config.s.group( this.room, this.roomNumber);

		if(config.active) {
			this.group.addClass('active');
		}
		//adding hover handler
		this.roomHover();
		this.roomChoose(o.worker);
	};

	f.prototype.getNewStyle = function(o){
		o.obj.animate(o.styles, o.duration);
	}

	f.prototype.roomHover = function(){
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
	f.prototype.roomChoose = function(o){
		var self = this;
		self.group.click(function(){
			var activeNode = this.parent().node.querySelectorAll('.active');
			if(activeNode.length) {
				[].forEach.call(activeNode,function(el){
					el.classList.remove('active');
				});
			}

			self.group.addClass('active');

			parentObj.worker.clean();
			parentObj.worker.init(o);
		})
	}
	f.prototype.configure = function(o) {
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

	o.workplace = f;
}(MAIN));
