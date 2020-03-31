'use strict';

const Homey = require('homey');
const MQTTClient = new Homey.ApiApp('nl.scanno.mqtt');

class EspSparsnasDevice extends Homey.Device {
	
	// this method is called when the Device is inited
	onInit() {
		this.log('Device init');
		this.log('Name:', this.getName());
		this.log('Class:', this.getClass());

		MQTTClient
			.register()
			.on('install', () => this.register())
			.on('uninstall', () => this.unregister())
			.on('realtime', (topic, message) => this.onMessage(topic, message));
		
		MQTTClient.getInstalled()
			.then(installed => {
				if (installed) {
					this.register();
				}
			})
			.catch(error => this.log(error));
	}

	onMessage(topic, message) {
		this.setCapabilityValue('measure_battery', message.battery);
		this.setCapabilityValue('meter_power', message.total);
		this.setCapabilityValue('measure_power', message.watt);
		if (this.getCapabilityValue('meter_power.peak' < message.total)) {
			this.setCapabilityValue('meter_power.peak', message.total);
		}
		if (this.getCapabilityValue('measure_power.peak' < message.watt)) {
			this.setCapabilityValue('measure_power.peak', message.watt);

		}

		//this.log(topic + ": " + JSON.stringify(message, null, 2));
	}

	register() {
		// Subscribe to all messages in the `homey` topic
		// messages will pass through the onMessage method via the realtime api
		MQTTClient.post(
			'subscribe', 
			{ topic: 'EspSparsnasGateway/valuesV2' }, 
			(error) => this.log(error || 'subscribed to topic: EspSparsnasGateway/valuesV2')
		);

	}

	unregister(){
		// ...
	}
	
}

module.exports = EspSparsnasDevice;