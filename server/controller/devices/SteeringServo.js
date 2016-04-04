var Servo = require("./servos/Servo.js");
module.exports = function SteeringServo() {
    return new Servo(-45, 45, 15);
};