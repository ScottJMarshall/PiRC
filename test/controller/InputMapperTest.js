var assert = require('assert');
var sinon = require('sinon');
var expect = require('chai').expect;
var InputMapper = require("../../server/controller/InputMapper.js");
describe("InputMapper", function() {
    var ACTIONS = ["accelerate", "decelerate", "left", "right"];
    var mapper, controller;

    beforeEach(function() {
        controller = {};
        controller.accelerate = sinon.spy();
        controller.decelerate = sinon.spy();
        controller.left = sinon.spy();
        controller.right = sinon.spy();

        mapper = new InputMapper(controller);
    });

    it("does nothing for undefined input objects", function() {
        mapper.processInput();
        validateInputsMapToCalls([])
    });

    it("does nothing with an empty input object", function() {
        mapper.processInput({});
        validateInputsMapToCalls([])
    });

    it("maps 'up' to accelerate", function() {
        mapper.processInput({ up: true });
        validateInputsMapToCalls(["accelerate"])
    });

    it("maps 'down' to decelerate", function() {
        mapper.processInput({ down: true });
        validateInputsMapToCalls(["decelerate"])
    });

    it("maps 'left' to left", function() {
        mapper.processInput({ left: true });
        validateInputsMapToCalls(["left"])
    });

    it("maps 'right' to right", function() {
        mapper.processInput({ right: true });
        validateInputsMapToCalls(["right"])
    });

    it("maps multiple inputs to multiple actions", function() {
        mapper.processInput({
            up: true,
            down: true,
            left: true,
            right: true
        });
        validateInputsMapToCalls(["accelerate", "decelerate", "left", "right"])
    });

    /**
     * Confirms that the specified actions are called, and also that the rest of the controller's actions
     * are not called.
     * @param actionsCalled
     */
    function validateInputsMapToCalls(actionsCalled) {
        actionsCalled.forEach(function(action) {
            expect(controller[action].calledOnce).to.be.true;
        });

        ACTIONS.forEach(function(action) {
            if (actionsCalled.indexOf(action) > -1) {
                return;
            }

            expect(controller[action].calledOnce).to.be.false;
        });
    }
});