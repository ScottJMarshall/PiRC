var config = require("../../../config.js");
var PhysicalServoController = require("./PhysicalServoController.js");
var VirtualServoController = require("./VirtualServoController.js");

function Servo(controller, lowerLimit, upperLimit, rate, position) {
    return {
        angle: 0,
        center: function() {
            var tempRate = rate;

            if (Math.abs(this.angle) < rate) {
                tempRate = this.angle;
            }

            if (this.angle > 0) {
                this.angle -= tempRate;
            } else if (this.angle < 0) {
                this.angle += tempRate;
            }

            controller.setAngle(position, this.angle);
        },
        clockwise: function() {
            this.angle += rate;
            if (this.angle > upperLimit) {
                this.angle = upperLimit;
            }

            controller.setAngle(position, this.angle);
        },
        counterclockwise: function() {
            this.angle -= rate;
            if (this.angle < lowerLimit) {
                this.angle = lowerLimit;
            }
            
            controller.setAngle(position, this.angle);
        }
    }
}

module.exports = {
    newServo: function(controller, lowerLimit, upperLimit, rate, position) {
        return new Servo(controller, lowerLimit, upperLimit, rate, position)
    },

    newDefaultServo: function(lowerLimit, upperLimit, rate, position) {
        var controller = (config.environment === "prod") ?
            PhysicalServoController.newDefaultController() :
            VirtualServoController.newDefaultController();

        return new Servo(controller, lowerLimit, upperLimit, rate, position);
    }
};