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
});