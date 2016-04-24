var Servo = require("./servos/Servo.js");
var config = require("../../config.js");

module.exports = function ThrottleServo() {
    return Servo.newDefaultServo(-100, 100, 40, config.servos.throttle.position);
};