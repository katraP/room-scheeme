/**
 * Created by Kateryna_Porkhun on 11/23/2015.
 */

function createSpace(){
	var s=Snap(300, 300);
	createRoom({
		room: {
			path: 'm 56.992402,2.3086277 c 30.80965,10e-6 30.30458,0 30.30458,0 l -1e-5,79.8020603 -74.2462095,-1e-5 -0.50508,-27.77919 26.7690395,0 17.67768,-25.75889 z',
			style: config.style.room
		},
		roomNumber: {
			style: config.style.roomNumber,
			offsetX: 60,
			offsetY: 73,
			text: '12'
		},
		space:s
	})
};