/**
 * Created by Kateryna_Porkhun on 11/23/2015.
 */
function createRoom(o){
	var s = o.space;
	var roomConf = o.room,
		textConf = o.roomNumber;

	//room config
	var roomPath=roomConf.path,
		roomHoverShadow=roomConf.style.hoverShadow,
		roomFill = roomConf.style.fill,
		stroke= roomConf.style.stroke,
		hoverScale= roomConf.style.hoverScale,
		hoverDuration = roomConf.style.hoverDuration,
		hoverFill = roomConf.style.hoverFill,
		hoverOpacity = roomConf.style.hoverOpacity;

	//roomNumber config
	var textOffsetX = textConf.offsetX,
		textOffsetY = textConf.offsetY,
		number = textConf.text,
		roomNumberStroke = textConf.style.stroke,
		roomNumberSize = textConf.style.size;

	var roomShadowBlock=s.path(roomPath),
			room=s.path(roomPath),
			shadow= s.filter(Snap.filter.shadow(0,0, 2, roomHoverShadow));
	room.attr({
		'fill': roomFill,
		stroke:stroke,
		cursor: 'pointer'
	}).addClass('room');
	roomShadowBlock.attr({
		'fill': 'none',
		stroke: stroke,
		filter: shadow,
		opacity: 0
	}).addClass('shadowBlock');

	var roomNumber = s.text(textOffsetX,textOffsetY, number)
			.attr({'fill':roomNumberStroke,
				'font-size':roomNumberSize,
				cursor: 'pointer'}
	).addClass('roomNumber');

	var roomGroup = s.selectAll('.room, .roomNumber, .shadowBlock');

	function getNewStyle(o){
		o.obj.animate(o.styles, o.duration);
	}
	function roomHover(){
		roomGroup.forEach(function(elem){
			elem.hover(function(){
				getNewStyle({
					obj: roomGroup,
					styles: {transform: 'scale('+hoverScale+')'},
					duration: hoverDuration
				});
				getNewStyle({
					obj: room,
					styles: {fill: hoverFill},
					duration: hoverDuration
				});
				getNewStyle({
					obj: roomShadowBlock,
					styles: {opacity: hoverOpacity},
					duration: hoverDuration
				});
			}, function(){
				getNewStyle({
					obj: roomGroup,
					styles: {transform: 'scale(1)'},
					duration: hoverDuration
				});
				getNewStyle({
					obj: room,
					styles: {fill: roomFill},
					duration: hoverDuration
				});
				getNewStyle({
					obj: roomShadowBlock,
					styles: {opacity: 0},
					duration: hoverDuration
				});
			})
		});
	}
	roomHover();
}