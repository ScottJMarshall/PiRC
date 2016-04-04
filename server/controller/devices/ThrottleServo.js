var Servo = require("./Servo.js");
module.exports = function ThrottleServo() {
    return new Servo(-100, 100, 40);
};