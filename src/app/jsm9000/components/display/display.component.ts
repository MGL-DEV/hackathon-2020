import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";

import { ReaderService } from "@app/jsm9000/services/reader.service";
import { VoiceOverService } from "@app/jsm9000/services/voice-over.service";

@Component({
    selector: "app-display",
    templateUrl: "./display.component.html",
    styleUrls: ["./display.component.scss"]
})
export class DisplayComponent implements OnInit, OnDestroy {

    @Input()
    public chapter: string;

    @Output()
    public ready: EventEmitter<SpeechSynthesisEvent> = new EventEmitter();

    public output = "";
    private speedOfPrintOut = 50;

    constructor(
        public readerService: ReaderService,
        public voiceOverService: VoiceOverService
    ) { }

    ngOnInit(): void {
        // this.chapter
        this.readerService.read().subscribe( text => {
            this.print(text);
            // this.voiceOverService.utter(text, event => this.ready.emit(event));
        });
    }

    ngOnDestroy(): void {
        this.voiceOverService.hush();
    }

    print(output): void {
        // TODO: handeling overflow
        [...output].forEach((letter, index) => {
            setTimeout(() => this.output += letter, index * this.speedOfPrintOut);
        });
    }

}
