'use strict';

const Homey = require('homey');

class EspSparsnasApp extends Homey.App {
	
	onInit() {
		this.log('EspSparsnasApp is running...');
	}
	
}

module.exports = EspSparsnasApp;