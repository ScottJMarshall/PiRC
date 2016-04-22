var config = require("../../../config.js");
var PhysicalServoController = require("./PhysicalServoController.js");
var VirtualServoController = require("./VirtualServoController.js");

function Servo(controller, lowerLimit, upperLimit, rate) {
    return {
        position: 0,
        center: function() {
            var tempRate = rate;

            if (Math.abs(this.position) < rate) {
                tempRate = this.position;
            }

            if (this.position > 0) {
                this.position -= tempRate;
            } else if (this.position < 0) {
                this.position += tempRate;
            }
        },
        clockwise: function() {
            this.position += rate;
            if (this.position > upperLimit) {
                this.position = upperLimit;
            }
        },
        counterclockwise: function() {
            this.position -= rate;
            if (this.position < lowerLimit) {
                this.position = lowerLimit;
            }

        }
    }
}

module.exports = {
    newServo: function(controller, lowerLimit, upperLimit, rate) {
        return new Servo(controller, lowerLimit, upperLimit, rate)
    },

    newDefaultServo: function(lowerLimit, upperLimit, rate, position) {
        var controller = (config.environment === "prod") ?
            new PhysicalServoController(position) :
            new VirtualServoController();

        return new Servo(controller, lowerLimit, upperLimit, rate);
    }
};