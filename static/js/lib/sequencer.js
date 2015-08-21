var sequencer = function() {
    return {
    tempo: 500,
    currentIndex: 0,
    playOn: false,
    _setTimeoutId: null,
    steps: 16,

    outCb: function(data, index) {
        return;
    },

    step: function() {
        this._setTimeoutId = setTimeout(function() {
            this.currentIndex = this.currentIndex + 1 % this.steps;
            this.outCb({index: this.currentIndex, start: true});
            this.step();
        }.bind(this), this.tempo);
    },

    start: function() {
        console.log('starting!');
        this.step();
        this.playOn = true;
    },

    stop: function() {
      this.playOn = false;
      clearTimeout(this._setTimeoutId);
    }
   };
};
