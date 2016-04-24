var CompactProtocolBuilder = require("./CompactProtocolBuilder.js");
function PhysicalServoController(serialDevice) {
    var commandBuilder = CompactProtocolBuilder.newBuilder();
    return {
        setAngle: function(position, angle) {
            var command = commandBuilder.position(position, angle);
            serialDevice.send(command)
        }
    }
}

module.exports = {
    newController: function(serialDevice) {
        return new PhysicalServoController(serialDevice)
    },

    // User the correct serial library when we get the right library
    newDefaultController: function() {
        return new PhysicalServoController({
            send: function() {}
        })
    }
};

