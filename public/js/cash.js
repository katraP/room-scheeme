/**
 * Created by Kateryna_Porkhun on 11/27/2015.
 */
(function(o){
	var f = function (){
		this.write = function(obj){
			if(localStorage['map']) {
				var storage = JSON.parse(localStorage['map']);
				storage.floor.push(obj);
				localStorage['map']= JSON.stringify(storage);
			}
			else {
				var floorCollection = {floor: [obj]};
				localStorage['map'] = JSON.stringify(floorCollection);
			}
		}
		this.init = function(floor){
			if(localStorage['map']) {
				var value = JSON.parse(localStorage['map']),
						trigger=false;
				for(var i=0; i< value.floor.length; i++) {
					console.log(value.floor[i].id, floor);
					if(value.floor[i].id == floor) {
						trigger= true;
						return value.floor[i];
					}
				}
				if(trigger==false){
					return false;
				}
			}
			else {
				return false;
			}
		}
	};
	o.cash = new f();
}(MAIN));