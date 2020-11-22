import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from "@angular/core";

import { JSM9000State } from "@app/jsm9000/models";
import { ReaderService } from "@app/jsm9000/services/reader.service";
import { VoiceOverService } from "@app/jsm9000/services/voice-over.service";

@Component({
    selector: "app-display",
    templateUrl: "./display.component.html",
    styleUrls: ["./display.component.scss"]
})
export class DisplayComponent implements OnInit, OnDestroy {

    @Input()
    public status = JSM9000State.Default;

    @Input()
    public source: string;

    @Output()
    public ready: EventEmitter<SpeechSynthesisEvent> = new EventEmitter();

    public output = "";
    private speedOfPrintOut = 50;

    constructor(
        public readerService: ReaderService,
        public voiceOverService: VoiceOverService
    ) { }

    ngOnInit(): void {
        this.readerService.read(this.source).subscribe( text => {
            this.print(text);
            this.voiceOverService.utter(text, event => this.ready.emit(event));
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
