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
});