var SteeringServo = require("./devices/SteeringServo.js");
var ThrottleServo = require("./devices/ThrottleServo.js");

function Controller(servos) {
    var lastInput = {};

    // Make sure that we at least having steering and throttle
    if (!servos.steering || !servos.throttle) {
        throw "Minimum of throttle and steering controller required";
    }

    // Track last input for every servo included in the config
    for (var servoName in servos) {
        if (!servos.hasOwnProperty(servoName)) {
            continue;
        }

        lastInput[servoName] = false;
    }

    /**
     * Ticks each servo towards the center if no control input came in.  The vehicle will decelerate and point
     * forward in the absence of any input
     */
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

                result[servoName] = servos[servoName].angle;
            }

            return result;
        }
    }
}

module.exports = {
    newDefaultController: function() {
        return this.newController({
            steering: new SteeringServo(),
            throttle: new ThrottleServo()
        });
    },

    newController: function(servos) {
        return new Controller(servos);
    }
};