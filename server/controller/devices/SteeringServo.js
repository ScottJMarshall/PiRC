var Servo = require("./Servo.js");
module.exports = function SteeringServo() {
    return new Servo(-45, 45, 15);
};