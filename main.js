

test.addEventListener("click", function (e) {
	var ac = new AudioContext();
	var osc = ac.createOscillator();
	var gain = ac.createGain();
	var bq = ac.createBiquadFilter();

	osc.connect(gain);
	gain.connect(ac.destination);
	osc.type = wave.value;
	osc.frequency.value = freq.value;
	gain.gain.value = vol.value;
	osc.start();
	osc.stop(2);
});


