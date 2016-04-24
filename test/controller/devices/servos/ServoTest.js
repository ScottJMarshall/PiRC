var assert = require('assert');
var sinon = require('sinon');
var expect = require('chai').expect;
var Servo = require("../../../../server/controller/devices/servos/Servo.js");
describe("CarController", function() {
    var controller, servo;

    beforeEach(function () {
        controller = {
            setAngle: sinon.spy()
        };
        servo = Servo.newServo(controller, -50, 50, 10, 0)
    });

    it("adds to the angle when clockwise is called", function() {
        servo.clockwise();
        expect(servo.angle).to.equal(10);
    });

    it("calls setAngle on clockwise", function() {
        servo.clockwise();
        expect(controller.setAngle.calledOnce).to.be.true;
        expect(controller.setAngle.calledWith(0, 10)).to.be.true;
    });

    it("calls setAngle on the servo controller", function() {
        servo.counterclockwise();
        expect(controller.setAngle.calledOnce).to.be.true;
        expect(controller.setAngle.calledWith(0, -10)).to.be.true;
    });

    it("calls setAngle on the servo controller", function() {
        servo.center();
        expect(controller.setAngle.calledOnce).to.be.true;
        expect(controller.setAngle.calledWith(0, 0)).to.be.true;
    });

    it("removes from the angle when counterclockwise is called", function() {
        servo.counterclockwise();
        expect(servo.angle).to.equal(-10);
    });

    it("limits angle values to the specified limit", function() {
        servo = Servo.newServo(controller, -50, 50, 33);
        servo.clockwise();
        servo.clockwise();

        expect(servo.angle).to.equal(50);
    });

    it("limits angle values to the specified limit", function() {
        servo = Servo.newServo(controller, -50, 50, 33);
        servo.counterclockwise();
        servo.counterclockwise();

        expect(servo.angle).to.equal(-50);
    });

    it("centers the servo by one interval when center is called", function() {
        servo = Servo.newServo(controller, -50, 50, 33);
        servo.clockwise();
        servo.clockwise();
        servo.center();

        expect(servo.angle).to.equal(17);
    });

    it("stops on zero if the servo is less than one interval from the center", function() {
        servo = Servo.newServo(controller, -50, 50, 33);
        servo.clockwise();
        servo.clockwise();
        servo.center();
        servo.center();

        expect(servo.angle).to.equal(0);
    });
});