var sinon = require('sinon');

module.exports = function MockServo() {
    var mock = {};

    mock.clockwise = sinon.spy();
    mock.counterclockwise = sinon.spy();
    mock.center = sinon.spy();

    return mock;
};