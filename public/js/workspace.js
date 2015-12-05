/**
 * Created by Kateryna_Porkhun on 11/23/2015.
 */


	/**
	 * function createArea - constructs floor based on input data;
	 * @param floor - number of creating floor
	 */
	function createArea(floor, workplace) {

		//cashing floor data
		var floorObj = MAIN.cash.init(floor);
		if(typeof floorObj !='object') {  //todo create function that will check cashed data
			addLoader();
			setTimeout(function(){
				ajaxCall({floor: floor}, function(response){
					if(typeof response == 'string') {
						var data = JSON.parse(response);

						//create floor
						MAIN.floor.init(data, workplace);
						MAIN.cash.write(data)
					}
					else {
						console.log('error');
					}
				});
				removeLoader();
			}, 2000);
		}
		else {
			//createFloor from cash
			MAIN.floor.init(floorObj, workplace);
		}
	}

