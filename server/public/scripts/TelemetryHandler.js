/**
 * Handles incoming telemetry data from the vehicle and updates the local representation accordingly
 */

function TelemetryHandler(vehicle) {
    function handleException(message) {
        console.log("Something is broken:", message);
    }
    
    $(document).ready(function() {
        var socket = io();
        socket.on('telemetry', function(message){
            if (message.state !== "ok")
                handleException(message);

            vehicle.setThrottlePosition(message.throttlePosition);
            vehicle.setWheelPosition(message.wheelPosition);
        });
    });
}