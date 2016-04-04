$(document).ready(function() {
    var keyHandler = new KeyHandler();
    var vehicle = new Vehicle();
    new TelemetryHandler(vehicle);
    var inputContainer = $("#input");
    var keyElements = {
        left: inputContainer.find(".left"),
        right: inputContainer.find(".right"),
        up: inputContainer.find(".up"),
        down: inputContainer.find(".down")
    };

    vehicle.onUpdate = function(vehicle) {
        $(".wheel").css({transform: "rotate(" + vehicle.wheelPosition + "deg)"});
        var forward = $("#throttle-forward").find(".throttle-fill");
        var reverse = $("#throttle-reverse").find(".throttle-fill");

        if (vehicle.throttlePosition > 0) {
            forward.css("height", vehicle.throttlePosition + "%");
            reverse.css("height", "0%");
        } else if (vehicle.throttlePosition < 0) {
            forward.css("height", "0%");
            reverse.css("height", Math.abs(vehicle.throttlePosition) + "%");
        } else {
            forward.css("height", "0%");
            reverse.css("height", "0%");
        }
    };

    keyHandler.onKey = function(keys) {
        for (var key in keyElements) {
            if (!keyElements.hasOwnProperty(key)) {
                continue;
            }

            keyElements[key].toggleClass("active", keys[key] === true);
        }
    }
});