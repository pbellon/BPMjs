'use strict';

var bpm = require('../bpm.js');
var instance = null;
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

describe('BPM', function(){
    beforeEach(function(){
        // default BPM instance runs with a time signature of 4/4 and a bpm of 120.
        instance = bpm.init();
    });
    afterEach(function(){
        instance.stop();
    });

    describe('#init()', function(){
        it('should have some default values when calling init without any parameters', function(){
            var i = bpm.init();
            var signature = i.getSignature();
            assert.notEqual(i, undefined);
            assert.equal(i.getBPM(), 120);
            assert.equal(signature[0], 4);
            assert.equal(signature[1], 4);
        });
    });

    describe('#onTick()', function(){
        it('should not call onTick until play() has been called', function(done){
            var called = false;
            instance.onTick(function(){
                called = true;
            });

            setTimeout(function(){
                expect(called).to.be.false;
                done();
            }, 600);
        });

        it('should transmit a position object when ticking to know the position', function(done){
            instance.onTick(function(position){
                expect(position).to.exist;
                expect(position.tick).to.exist;
                expect(position.bar).to.exist;
                done();
            });
            instance.play();
        });

        it('should tick the appropriate number of time depending on BPM given', function(done){
            var nbCalled = 0;
            setTimeout(function(){
                // nbCalled must have been called 2 time after 1 seconds (120 bpm = 2 beats per seconds)
                expect(nbCalled).to.be.equal(2);
                done();
            }, 1100);
            // instance = bpm.init();
            instance.onTick(function(){ nbCalled++; });
            instance.play();
        });
        it('should tick the appropriate number of time even if paused', function(done){
            var nbCalled = 0;
            setTimeout(function(){
                // nbCalled must have been called 2 time after 1 seconds (120 bpm = 2 beats per seconds)
                expect(nbCalled).to.be.equal(2);
                done();
            }, 1800);
            instance.onTick(function(){
                nbCalled++;
            });
            setTimeout(function(){
                instance.pause();
            }, 600);
            setTimeout(function(){
                instance.play();
            }, 1000);
            instance.play();


        });
    });

    describe('#setBPM()', function(){
        it('should take into account the new BPM even when playing is in progress',function(done){
            var nbCalled = 0;
            setTimeout(function(){
                expect(nbCalled).to.be.equal(4);
                done();
            }, 1100);
            instance.onTick(function(){
                nbCalled++;
            });
            instance.play();
            // raising BPM to 240 -> it should tick 4 time every seconds
            instance.setBPM(240);
        });
    });
});
