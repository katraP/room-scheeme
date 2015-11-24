/**
 * Created by Kateryna_Porkhun on 11/20/2015.
 */
(function(o){

	loadJSON(function(response){
		var data = JSON.parse(response);
		var createSpace = new o.CreateSpace();
		createSpace.init(data.floor);
	});


}(MAIN));



