var Servo = require("./servos/Servo.js");
module.exports = function ThrottleServo() {
    return Servo.newDefaultServo(-100, 100, 40);
};