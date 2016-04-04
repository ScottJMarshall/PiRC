var SteeringServo = require("./devices/SteeringServo.js");
var ThrottleServo = require("./devices/ThrottleServo.js");

module.exports = function Controller() {
    var servos = {
        steering: new SteeringServo(),
        throttle: new ThrottleServo()
    };

    var lastInput = {
        steering: false,
        throttle: false
    };

    function centerIfNoInput() {
        for (var servoName in servos) {
            if (!servos.hasOwnProperty(servoName)) {
                return;
            }

            if (!lastInput[servoName]) {
                servos[servoName].center();
            }

            lastInput[servoName] = false;
        }
    }

    return {
        tick: function() {
            centerIfNoInput();
        },
        
        left: function() {
            servos.steering.counterclockwise();
            lastInput.steering = true;
        },
        
        right: function() {
            servos.steering.clockwise();
            lastInput.steering = true;
        },
        
        accelerate: function() {
            servos.throttle.clockwise();
            lastInput.throttle = true;
        },
        
        decelerate: function() {
            servos.throttle.counterclockwise();
            lastInput.throttle = true;
        },
        
        getTelemetry: function() {
            var result = {};
            for (var servoName in servos) {
                if (!servos.hasOwnProperty(servoName)) {
                    continue;
                }

                result[servoName] = servos[servoName].position;
            }

            return result;
        }
    }
};