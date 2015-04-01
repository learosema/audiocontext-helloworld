var ac = new AudioContext();
oscillatorPlayButton.onclick = function (e) {
	var osc = ac.createOscillator();
	var gain = ac.createGain();  
    var duration = parseInt(dura.value) * 1000;
	osc.connect(gain);
	gain.connect(ac.destination);
	osc.type = wave.value;
	osc.frequency.value = freq.value;
	gain.gain.value = vol.value;
	osc.start();
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
}