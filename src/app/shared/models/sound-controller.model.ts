export default class SoundController {
    private track: string;
    public offlineCtx: any;
    public source: any;
    private song: any;
    public audioCtx: any;
    private gainNode: any;

    constructor(track: string) {
        this.track = track
        this.audioCtx = new AudioContext();
        this.init();
    }

    private init() {
        this.song = document.createElement("AUDIO");
        this.song.crossOrigin = "anonymous";
        this.song.setAttribute("src", this.track);
        this.source = this.audioCtx.createMediaElementSource(this.song);
        this.gainNode = this.audioCtx.createGain();
        this.gainNode.gain.value = 1;
        this.source.connect(this.gainNode);
        this.gainNode.connect(this.audioCtx.destination);
    }

    public play() {
        this.audioCtx.resume();
        this.song.play();
    }

    public playLoop() {
        this.song.loop = true;
        this.audioCtx.resume();
        this.song.play();
    }

    public stop() {
        this.song.pause();
        this.song.currentTime = 0;
        this.gainNode.gain.value = 1;
    }

    public fadeDown() {
        this.gainNode.gain.setTargetAtTime(0, this.audioCtx.currentTime + 1, 0.5);
    }

    public fadeUp() {
        this.gainNode.gain.value = 0;
        this.play();
        this.gainNode.gain.setTargetAtTime(1, this.audioCtx.currentTime + 1, 0.5);
    }

    public volume(value: number) {
        this.gainNode.gain.value = value / 100;
    }
}