/**
 * Contains telemetry data for the vehicle.  Currently only supports throttle and wheel position, but will be updated
 * to report acceleration, GPS data, etc.
 */


function Vehicle() {
    var wheelPosition = 0;
    var throttlePosition = 0;
    return {
        // Takes a decimal value between 100.0 (full forward) and -100.0 (full reverse)
        set throttlePosition(position) {
            throttlePosition = position;
        },

        // Takes a decimal value between -45.0 (left limit) and 45.0 (right limit)
        set wheelPosition(position) {
            wheelPosition = position;
        },

        get throttlePosition() {
            return throttlePosition;
        },

        get wheelPosition() {
            return wheelPosition;
        }
    }
}