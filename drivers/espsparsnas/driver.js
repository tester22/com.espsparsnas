'use strict';

const Homey = require('homey');

class EspSparsnasDriver extends Homey.Driver {
	
	onInit() {
		this.log('EspSparsnasDriver has been inited');
	}
	onPairListDevices( data, callback ) {
		callback( null, [
			{
				name: 'Sparsnäs',
				data: {
					id: 'espsparsnasgateway'
				}
			}
		]);
	}
	
}

module.exports = EspSparsnasDriver;