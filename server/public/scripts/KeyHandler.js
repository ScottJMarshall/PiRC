/**
 * Handles key press events.  All we really care about are the arrow keys.
 *
 * The key handler will update the vehicle once every PUBLISH_INTERVAL milliseconds
 *
 * @constructor
 */

function KeyHandler() {
    var PUBLISH_INTERVAL = 100;
    var pressedKeys = {};
    var timeout;
    var socket = io();

    var obj = {
        onKey: function(pressedKeys) {

        }
    };

    $(document).keydown(function(evt) {
        var code = evt.keyCode;

        if (code == 37) {
            pressedKeys.left = true;
        } else if (code == 38) {
            pressedKeys.up = true;
        } else if (code == 39) {
            pressedKeys.right = true;
        } else if (code == 40) {
            pressedKeys.down = true;
        }

        publishKeys();
    });

    $(document).keyup(function(evt) {
        var code = evt.keyCode;

        if (code == 37) {
            delete pressedKeys.left;
        } else if (code == 38) {
            delete pressedKeys.up;
        } else if (code == 39) {
            delete pressedKeys.right;
        } else if (code == 40) {
            delete pressedKeys.down;
        }
    });

    function publishKeys() {
        if (typeof obj.onKey === "function") {
            obj.onKey(pressedKeys);
        }

        if (!Object.keys(pressedKeys).length) {
            return;
        }

        // We're waiting for the publish interval to elapse
        if (timeout) {
            return;
        }

        socket.emit("keys", pressedKeys);

        // Queues up another publish in PUBLISH_INTERVAL milliseconds.
        timeout = setTimeout(function() {
            // Clear out the timeout and try publishing keys again.  At this point we've waited PUBLISH_INTERVAL
            // so it's ok to clear the timeout.  We will publish if any are still depressed or break out of the
            // none are pressed.
            timeout = void(0);
            publishKeys();
        }, PUBLISH_INTERVAL);
    }

    return obj;
}