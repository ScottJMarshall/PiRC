function Builder() {
    var base = 0x84;
    var first = 0b00000001111111;
    var second = 0b11111110000000;

    function getBytes(timing) {
        var firstBytes = timing & first;
        var secondBytes = (timing & second) >> 7;
        return [firstBytes, secondBytes];
    }

    return {
        position: function(servo, angle) {
            var center = 6000;
            var percent = angle / 90.0;
            var offset = 2000 * percent;
            var timing = parseInt(center + offset);
            var angleBytes = getBytes(timing);

            return [base, servo].concat(angleBytes);
        }
    }
}

module.exports = {
    newBuilder: function() {
        return new Builder()
    }
};