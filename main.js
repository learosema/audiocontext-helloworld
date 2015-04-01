var ac = new AudioContext();

function makeDistortionCurve(amount) {
  var k = typeof amount === 'number' ? amount : 50,
    n_samples = 44100,
    curve = new Float32Array(n_samples),
    deg = Math.PI / 180,
    i = 0,
    x;
  for ( ; i < n_samples; ++i ) {
    x = i * 2 / n_samples - 1;
    curve[i] = ( 3 + k ) * x * 20 * deg / ( Math.PI + k * Math.abs(x) );
  }
  return curve;
}

oscillatorPlayButton.onclick = function (e) {
    var osc = ac.createOscillator();
    var gain = ac.createGain();  
    var distortion = ac.createWaveShaper();
    distortion.curve = makeDistortionCurve(parseInt(dist.value));
    distortion.oversample = "4x";
    osc.connect(distortion);
    distortion.connect(gain);
    gain.connect(ac.destination);
    osc.type = wave.value;
    osc.frequency.value = freq.value;
    gain.gain.value = vol.value;
    osc.start();
    var duration = parseInt(dura.value) * 1000;
    window.setTimeout(function () {
        osc.stop();
        osc.disconnect();
    }, duration);
};

whiteNoiseButton.onclick = function (e) {
    var frames = ac.sampleRate;
    var buf = ac.createBuffer(2, frames, ac.sampleRate);
    for (var ch = 0; ch < 2; ch++) {
        var cData = buf.getChannelData(ch);
        for (var i = 0; i < frames; i++) {
            cData[i] = Math.random() * 2 - 1;
        }
    }
    var src = ac.createBufferSource();
    src.buffer = buf;
    src.connect(ac.destination);
    src.start();
};

