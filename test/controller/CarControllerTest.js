var assert = require('assert');
var sinon = require('sinon');
var expect = require('chai').expect;
var CarController = require("../../server/controller/CarController.js");
var MockServo = require("./MockServo.js");
describe("CarController", function() {
    var servos, controller;

    beforeEach(function() {
        servos = {
            throttle: new MockServo(),
            steering: new MockServo()
        };
        controller = CarController.newController(servos);
    });

    it("ensures minimum required servos", function() {
        expect(function() {
            CarController.newController({});
        }).to.throw("Minimum of throttle and steering controller required");
    });

    it("calls clockwise on the steering servo to turn right", function() {
        controller.right();
        expect(servos.steering.clockwise.calledOnce).to.be.true;
    });

    it("calls counterclockwise on the steering servo to turn left", function() {
        controller.left();
        expect(servos.steering.counterclockwise.calledOnce).to.be.true;
    });

    it("calls clockwise on the throttle servo to accelerate", function() {
        controller.accelerate();
        expect(servos.throttle.clockwise.calledOnce).to.be.true;
    });

    it("calls counterclockwise on the throttle servo to decelerate", function() {
        controller.decelerate();
        expect(servos.throttle.counterclockwise.calledOnce).to.be.true;
    });

    it("centers all servos that have had no input", function() {
        controller.accelerate();
        controller.tick();
        expect(servos.throttle.center.calledOnce).to.be.false;
        expect(servos.steering.center.calledOnce).to.be.true;
    });

    it("provides angle data for all servos", function() {
        servos.throttle.angle = 10;
        servos.steering.angle = 5;

        var positions = controller.getTelemetry();
        expect(positions.throttle).to.equal(10);
        expect(positions.steering).to.equal(5);
    })
});