/**
 * Created by Kateryna_Porkhun on 11/23/2015.
 */
(function(o){
	var f = function(){};

	f.prototype.init = function(o){
		var workerData = o,
			mainContainer = document.querySelector('.main-wrap');
		var container = document.createElement('div');
		container.setAttribute('class', 'worker');

		var containerTitle = document.createElement('div');
		containerTitle.setAttribute('class', 'worker__title');
		containerTitle.innerHTML = workerData.name;
		container.appendChild(containerTitle);

		var contactList = document.createElement('ul');
		contactList.setAttribute('class','worker-contacts');
		container.appendChild(contactList);
		for(var key in workerData.contacts){
			var contact = document.createElement('li');
			contact.setAttribute('class', 'worker-contacts__item ' +key );
			contact.innerHTML= workerData.contacts[key];
			contactList.appendChild(contact);
		}
		mainContainer.appendChild(container);
	}
	f.prototype.clear = function(){
		var mainContainer = document.querySelector('.main-wrap');
		if(mainContainer.getElementsByClassName('worker')[0]){
			mainContainer.removeChild(mainContainer.getElementsByClassName('worker')[0]);
		}
	}

	o.worker = new f();
}(MAIN));