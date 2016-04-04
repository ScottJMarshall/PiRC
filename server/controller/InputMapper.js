module.exports = function InputMapper(controller) {
    return {
        processInput: function(message) {
            if (message.up) {
                controller.accelerate();
            }

            if (message.down) {
                controller.decelerate();
            }

            if (message.left) {
                controller.left();
            }

            if (message.right) {
                controller.right();
            }
        }
    }
};