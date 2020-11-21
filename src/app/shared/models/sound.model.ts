import SoundArgs from "./sound-args"
import SoundController from "./sound-controller.model"

export default class Sound {
    track = new Map();

    constructor(args: SoundArgs) {
        for (let key of Object.keys(args)) {
            this.track.set(key, new SoundController((args as any)[key]))
        }
    }

    public change(from: string, to: string) {
        this.track.get(from).fadeDown()
        setTimeout(() => {
            this.track.get(to).fadeUp()
        }, 500);
    }
}