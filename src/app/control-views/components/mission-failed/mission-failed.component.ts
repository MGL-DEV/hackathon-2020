import { Component, OnInit, OnDestroy } from "@angular/core";

import { StorageService } from "@core/services/storage.service";
/*import { SoundEffectsService } from "@shared/services/sound-effects.service";
import { Sound } from "@shared/models";*/

@Component({
    selector: "app-mission-failed",
    templateUrl: "./mission-failed.component.html",
    styleUrls: ["./mission-failed.component.scss"]
})
export class MissionFailedComponent implements OnInit, OnDestroy {

    public output = "";
    private speedOfPrintOut = 25;
    //public sound: Sound;

    constructor(
        private storageService: StorageService/*,
        public soundEffectsService: SoundEffectsService*/) {
        /*this.sound = this.soundEffectsService.get()
        this.sound.track.get("missionFailed").volume(20)
        this.sound.track.get("missionFailed").play()*/
    }

    ngOnInit(): void {
        this.print(this.storageService.get("log").join("\n"));
    }

    ngOnDestroy(): void {
        //this.sound.track.get("missionFailed").stop()
    }

    share(): void {
        if (navigator.share) {
            navigator.share({
                title: "Sileo",
                text: "Hey Bro, You must check this out! :male-astronaut: Mission SILEO! :rocket:",
                url: "https://sileo.mgldev.hu"
            });
        }
    }

    get hasShare(): boolean {
        return !!navigator.share;
    }

    print(output): void {
        // TODO: handeling overflow
        [...output].forEach((letter, index) => {
            setTimeout(() => this.output += letter, index * this.speedOfPrintOut);
        });
    }

}
