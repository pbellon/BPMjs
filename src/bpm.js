'use 6to5';

class BPM {
    constructor(opts) {
        opts = opts || {};
        let onTick = opts.onTick;
        let onBarTick = opts.onBarTick;

        this.onTickCallbacks = [];
        this.onBarTickCallbacks = [];

        if(onTick){
            this.onTickCallbacks.push(onTick);
        }
        if(onBarTick){
            this.onBarTickCallbacks.push(onBarTick);
        }
        this.bpm = opts.bmp || 120;
        // used to fire _onTick to regular intervals (in ms)
        this.internalTick = (1/(this.bpm / 60))*1000;
        this.signature =  opts.signature || [4,4];
        this.currentTick = 0;
        this.currentBar = 0;
    }
    // Private API
    _getStamp(){
        return (new Date()).getTime();
    }

    _setInterval(){
        let tick = this.internalTick;
        if(this.isPaused()){
            tick = this.unpauseTick;
        }
        this.playingInterval = setInterval(()=> {
            this._onTick();
        }, tick);
    }

    _stopPlaying(){
        if(this.isPlaying()){
            clearInterval(this.playingInterval);
            delete this.playingInterval;
        }
    }

    _resetPosition(){
        this.currentTick = 0;
        this.currentBar = 0;
    }

    _updatePosition(){
        if(this.currentTick === this.signature[0]){
            this.currentTick = 0;
            this.currentBar++;
            this._onBarTick();
        }
    }

    _onTick(){
        this.timestamp = this._getStamp();
        this.currentTick++;

        if(this.isPaused()){
            console.log('is paused !');
            delete this.unpauseTick;
            this._stopPlaying();
            this._setInterval();
        }
        this._updatePosition();
        this._fireCallbacks(this.onTickCallbacks);
    }

    _onBarTick(){
        this._fireCallbacks(this.onBarTickCallbacks);
    }

    _fireCallbacks(callbacks){
        for(let i in callbacks){
            let cb = callbacks[i];
            cb.call({tick: this.currentTick, bar: this.currentBar});
        }
    }

    _resetPlaying(){
        this.currentBar = 0;
        this.currentTick = 0;
    }

    // Public API
    isPlaying(){
        return !!this.playingInterval;
    }

    isPaused(){
        return !!this.unpauseTick;
    }

    getBPM(){
        return this.bpm;
    }

    getSignature(){
        return this.signature;
    }
    getPosition(){
        return {
            tick: this.currentTick,
            bar: this.currentBar
        };
    }

    // add a callback for every ticking
    onTick(cb){
        if(this.onTickCallbacks.indexOf(cb) === -1){
            this.onTickCallbacks.push(cb);
        }
    }

    // add a callback for every bar crossed
    onBarTick(cb){
        if(this.onTickCallbacks.indexOf(cb) === -1){
            this.onTickCallbacks.push(cb);
        }

    }

    // starts ticking
    play(){
        this._setInterval();
    }

    // reset position to 0 and stops ticking
    stop(){
        this._stopPlaying();
        this._resetPosition();
    }

    pause(){
        if(this.isPlaying()){
            this._stopPlaying();
            // the next interval to use when play() is called again
            this.unpauseTick = this.internalTick - (this._getStamp() - this.timestamp);
        }
    }
}

(function(context){
    let bpm = {
        init(params){
            return new BPM(params);
        }
    };
    if(typeof module === 'object'){
        module.exports = bpm;
    } else {
        context.bpm = bpm;
    }
}).call(this);