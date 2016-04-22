var Servo = require("./servos/Servo.js");
module.exports = function SteeringServo() {
    return Servo.newDefaultServo(-45, 45, 15);
};