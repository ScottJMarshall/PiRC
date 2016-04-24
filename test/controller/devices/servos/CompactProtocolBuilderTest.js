var assert = require('assert');
var sinon = require('sinon');
var expect = require('chai').expect;
var CompactProtocolBuilder = require("../../../../server/controller/devices/servos/CompactProtocolBuilder.js");
describe("CompactProtocolBuilder", function() {
    var protocolBuilder;

    beforeEach(function () {
        protocolBuilder = new CompactProtocolBuilder.newBuilder();
    });

    it("sets the position to 0 degrees", function() {
        var command = protocolBuilder.position(1, 0);
        expect(command).to.eql([0x84, 0x01, 0x70, 0x2E]);
    });

    it("sets the position to -90 degrees", function() {
        var command = protocolBuilder.position(1, -90);
        expect(command).to.eql([0x84, 0x01, 0x20, 0x1F]);
    });

    it("sets the position to 90 degrees", function() {
        var command = protocolBuilder.position(1, 90);
        expect(command).to.eql([0x84, 0x01, 0x40, 0x3E]);
    });

    it("handles decimal position values", function() {
        var command = protocolBuilder.position(1, 45.5);
        expect(command).to.eql([0x84, 0x01, 0x63, 0x36]);
    });
});