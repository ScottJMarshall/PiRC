var Servo = require("./servos/Servo.js");
var config = require("../../config.js");

module.exports = function SteeringServo() {
    return Servo.newDefaultServo(-45, 45, 15, config.servos.steering.position);
};