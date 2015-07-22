# BPMjs

A small javascript library to ease the pain of working with musical signatures
and BPM.

## Usage

### Initialization
1. bpm.init()
    ```javascript
    var options = {
        bpm: 65, // default value: 120
        signature: [6, 8] // default: `[4,4]` as for a 4/4 time signature
        onTick: function(){}, // default: `undefined`
        onBarTick: function(){}, // default: `undefined`
    }
    var bpmObject = bpm.init(options);
    ```

2. Add some callbacks
    ```javascript
    bpmObject.onTick(function(position){
        // position is an object to know where the playing position is
        // ex: {tick: 2, bar: 4}
        console.log('called on every tick', position);
    });
    bpmObject.onBarTick(function(position){
        console.log('called on bar crossed', position);
    });
    ```

### Control over the playing/stop etc.

```javascript
// start ticking
bpmObject.play();
// pause playing
bpmObject.pause();
// stop playing (resets position to 0:0)
bpmObject.stop();
```

### Get some information
```javascript
bpmObject.isPlaying(); // true|false
bpmObject.isPaused(); // true|false
bpmObject.getPosition(); // {tick: 2, bar: 3}
```

## License

> The MIT License (MIT)
>
> Copyright (c) 2015 Pierre Bellon (@Toutenrab)
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in
> all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
> THE SOFTWARE.
