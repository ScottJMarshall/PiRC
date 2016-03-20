function Controller() {
    var tickCount = 0;
    return {
        tick: function() {
            console.log("tick");
            tickCount++;
        },

        getTickCount: function() {
            return tickCount;
        }
    }
}

module.exports = {
    newController: function() {
        return new Controller();
    }
};