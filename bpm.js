'use strict';

'use 6to5';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var BPM = (function () {
    function BPM(opts) {
        _classCallCheck(this, BPM);

        opts = opts || {};
        var onTick = opts.onTick;
        var onBarTick = opts.onBarTick;

        this.onTickCallbacks = [];
        this.onBarTickCallbacks = [];

        if (onTick) {
            this.onTickCallbacks.push(onTick);
        }
        if (onBarTick) {
            this.onBarTickCallbacks.push(onBarTick);
        }
        this.bpm = opts.bmp || 120;
        // used to fire _onTick to regular intervals (in ms)
        this.internalTick = 1 / (this.bpm / 60) * 1000;
        this.signature = opts.signature || [4, 4];
        this.currentTick = 0;
        this.currentBar = 0;
    }

    // Private API

    _createClass(BPM, [{
        key: '_getStamp',
        value: function _getStamp() {
            return new Date().getTime();
        }
    }, {
        key: '_setInterval',
        value: function _setInterval() {
            var _this = this;

            var tick = this.internalTick;
            if (this.isPaused()) {
                tick = this.unpauseTick;
            }
            this.playingInterval = setInterval(function () {
                _this._onTick();
            }, tick);
        }
    }, {
        key: '_stopPlaying',
        value: function _stopPlaying() {
            if (this.isPlaying()) {
                clearInterval(this.playingInterval);
                delete this.playingInterval;
            }
        }
    }, {
        key: '_resetPosition',
        value: function _resetPosition() {
            this.currentTick = 0;
            this.currentBar = 0;
        }
    }, {
        key: '_updatePosition',
        value: function _updatePosition() {
            if (this.currentTick === this.signature[0]) {
                this.currentTick = 0;
                this.currentBar++;
                this._onBarTick();
            }
        }
    }, {
        key: '_onTick',
        value: function _onTick() {
            this.timestamp = this._getStamp();
            this.currentTick++;

            if (this.isPaused()) {
                console.log('is paused !');
                delete this.unpauseTick;
                this._stopPlaying();
                this._setInterval();
            }
            this._updatePosition();
            this._fireCallbacks(this.onTickCallbacks);
        }
    }, {
        key: '_onBarTick',
        value: function _onBarTick() {
            this._fireCallbacks(this.onBarTickCallbacks);
        }
    }, {
        key: '_fireCallbacks',
        value: function _fireCallbacks(callbacks) {
            for (var i in callbacks) {
                var cb = callbacks[i];
                cb.call({ tick: this.currentTick, bar: this.currentBar });
            }
        }
    }, {
        key: '_resetPlaying',
        value: function _resetPlaying() {
            this.currentBar = 0;
            this.currentTick = 0;
        }

        // Public API
    }, {
        key: 'isPlaying',
        value: function isPlaying() {
            return !!this.playingInterval;
        }
    }, {
        key: 'isPaused',
        value: function isPaused() {
            return !!this.unpauseTick;
        }
    }, {
        key: 'getBPM',
        value: function getBPM() {
            return this.bpm;
        }
    }, {
        key: 'getSignature',
        value: function getSignature() {
            return this.signature;
        }
    }, {
        key: 'getPosition',
        value: function getPosition() {
            return {
                tick: this.currentTick,
                bar: this.currentBar
            };
        }

        // add a callback for every ticking
    }, {
        key: 'onTick',
        value: function onTick(cb) {
            if (this.onTickCallbacks.indexOf(cb) === -1) {
                this.onTickCallbacks.push(cb);
            }
        }

        // add a callback for every bar crossed
    }, {
        key: 'onBarTick',
        value: function onBarTick(cb) {
            if (this.onTickCallbacks.indexOf(cb) === -1) {
                this.onTickCallbacks.push(cb);
            }
        }

        // starts ticking
    }, {
        key: 'play',
        value: function play() {
            this._setInterval();
        }

        // reset position to 0 and stops ticking
    }, {
        key: 'stop',
        value: function stop() {
            this._stopPlaying();
            this._resetPosition();
        }
    }, {
        key: 'pause',
        value: function pause() {
            if (this.isPlaying()) {
                this._stopPlaying();
                // the next interval to use when play() is called again
                this.unpauseTick = this.internalTick - (this._getStamp() - this.timestamp);
            }
        }
    }]);

    return BPM;
})();

var bpm = {
    init: function init(params) {
        return new BPM(params);
    }
};

exports['default'] = bpm;
module.exports = exports['default'];