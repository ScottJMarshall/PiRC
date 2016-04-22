var assert = require('assert');
var sinon = require('sinon');
var expect = require('chai').expect;
var Servo = require("../../../../server/controller/devices/servos/Servo.js");
describe("CarController", function() {
    var controller, servo;

    beforeEach(function () {
        controller = {};
        servo = Servo.newServo(controller, -50, 50, 10)
    });

    it("adds to the position when clockwise is called", function() {
        servo.clockwise();
        expect(servo.position).to.equal(10);
    });

    it("removes from the position when counterclockwise is called", function() {
        servo.counterclockwise();
        expect(servo.position).to.equal(-10);
    });

    it("limits position values to the specified limit", function() {
        servo = Servo.newServo(controller, -50, 50, 33);
        servo.clockwise();
        servo.clockwise();

        expect(servo.position).to.equal(50);
    });

    it("limits position values to the specified limit", function() {
        servo = Servo.newServo(controller, -50, 50, 33);
        servo.counterclockwise();
        servo.counterclockwise();

        expect(servo.position).to.equal(-50);
    });

    it("centers the servo by one interval when center is called", function() {
        servo = Servo.newServo(controller, -50, 50, 33);
        servo.clockwise();
        servo.clockwise();
        servo.center();

        expect(servo.position).to.equal(17);
    });

    it("stops on zero if the servo is less than one interval from the center", function() {
        servo = Servo.newServo(controller, -50, 50, 33);
        servo.clockwise();
        servo.clockwise();
        servo.center();
        servo.center();

        expect(servo.position).to.equal(0);
    });
});