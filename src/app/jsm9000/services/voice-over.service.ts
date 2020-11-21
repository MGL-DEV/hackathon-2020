import { Injectable, NgZone } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class VoiceOverService {

    private speechSynthesis: SpeechSynthesis;
    private pitch = 1;
    private rate = 1;

    constructor(private zone: NgZone) {
        this.speechSynthesis = window.speechSynthesis;
    }

    utter(text: string, onend?: (event: SpeechSynthesisEvent) => void) {
        const utterance = new SpeechSynthesisUtterance(text);

        utterance.lang = "en-GB";
        utterance.pitch = this.pitch;
        utterance.rate = this.rate;

        if (onend) {
            utterance.onend = event => {
                this.zone.run(() => onend(event));
            };
        }

        this.speechSynthesis.speak(utterance);
    }

    hush(): void {
        speechSynthesis.cancel();
    }

}