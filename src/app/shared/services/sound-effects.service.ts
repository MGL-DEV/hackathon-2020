import { Injectable } from "@angular/core";
import { Sound } from "../models/"

@Injectable({
    providedIn: "root"
})
export class SoundEffectsService {

    constructor() { }

    get(): Sound {
        const sound = new Sound({
            winLoop: "https://sileo.mgldev.hu/sound/win_loop.mp3",
            messageSent: "https://sileo.mgldev.hu/sound/message_sent.mp3",
            laserPew: "https://sileo.mgldev.hu/sound/laser_pew.mp3",
            gameLoop: "https://sileo.mgldev.hu/sound/game_loop.mp3",
            explosion: "https://sileo.mgldev.hu/sound/explosion.mp3",
            enginePowerUp: "https://sileo.mgldev.hu/sound/engine_power_up.mp3",
            digitalNoiz: "https://sileo.mgldev.hu/sound/digital_noiz.mp3",
            button: "https://sileo.mgldev.hu/sound/button.mp3",
            ambientAtmo: "https://sileo.mgldev.hu/sound/ambient_atmo.mp3",
            missionFailed: "https://sileo.mgldev.hu/sound/mission_failed.mp3",
        });
        return sound;
    }
}
