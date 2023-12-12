/*
Filename: ComplexApplication.js

Description: 

This is a complex JavaScript application that demonstrates a smart home control system. 
It includes multiple classes, inheritance, event handling, and various utility functions.

The application simulates controlling various smart home devices including lights, thermostats, and security systems.

Please note that this code is for illustrative purposes only and does not provide actual functionality.

*/

// Utility Functions
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function log(message) {
  console.log(`[LOG] - ${message}`);
}

// Base Device Class
class SmartDevice {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.status = false;
  }

  async turnOn() {
    this.status = true;
    log(`${this.name} turned on.`);
    await delay(500);
  }

  async turnOff() {
    this.status = false;
    log(`${this.name} turned off.`);
    await delay(500);
  }
}

// Light Device Class (Inherits from SmartDevice)
class Light extends SmartDevice {
  constructor(id, name) {
    super(id, name);
    this.brightness = 0;
  }

  async setBrightness(brightness) {
    if (brightness >= 0 && brightness <= 100) {
      this.brightness = brightness;
      log(`${this.name} brightness set to ${brightness}%`);
    } else {
      log(`Invalid brightness value for ${this.name}`);
    }
    await delay(500);
  }
}

// Thermostat Device Class (Inherits from SmartDevice)
class Thermostat extends SmartDevice {
  constructor(id, name) {
    super(id, name);
    this.currentTemperature = 0;
    this.targetTemperature = 0;
  }

  async setTemperature(targetTemperature) {
    this.targetTemperature = targetTemperature;
    log(`${this.name} target temperature set to ${targetTemperature}°C`);
    await delay(500);
  }

  async getCurrentTemperature() {
    // Simulating temperature retrieval from external source
    await delay(1000);
    this.currentTemperature = Math.floor(Math.random() * 30) + 10;
    log(`${this.name} current temperature is ${this.currentTemperature}°C`);
  }
}

// Security System Device Class (Inherits from SmartDevice)
class SecuritySystem extends SmartDevice {
  constructor(id, name) {
    super(id, name);
    this.isArmed = false;
  }

  async arm() {
    this.isArmed = true;
    log(`${this.name} is armed.`);
    await delay(500);
  }

  async disarm() {
    this.isArmed = false;
    log(`${this.name} is disarmed.`);
    await delay(500);
  }
}

// Application Initialization
async function initialize() {
  // Creating Devices
  const livingRoomLight = new Light('001', 'Living Room Light');
  const kitchenLight = new Light('002', 'Kitchen Light');
  const livingRoomThermostat = new Thermostat('003', 'Living Room Thermostat');
  const securitySystem = new SecuritySystem('004', 'Home Security System');

  // Turning on devices
  await livingRoomLight.turnOn();
  await kitchenLight.turnOn();

  // Setting brightness
  await livingRoomLight.setBrightness(80);

  // Setting target temperature
  await livingRoomThermostat.setTemperature(23);

  // Getting current temperature
  await livingRoomThermostat.getCurrentTemperature();

  // Arming security system
  await securitySystem.arm();

  // Turning off devices
  await livingRoomLight.turnOff();
  await kitchenLight.turnOff();

  // Disarming security system
  await securitySystem.disarm();
}

// Running the application
initialize().catch(console.error);