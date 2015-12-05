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
				var resultArr = value.floor.filter(function(el){
					return el.id == floor;
				});
				return resultArr[0] || false ;
			}
			else {
				return false;
			}
		}
	};
	o.cash = new f();
}(MAIN));