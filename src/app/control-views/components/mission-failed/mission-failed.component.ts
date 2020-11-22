import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-mission-failed",
    templateUrl: "./mission-failed.component.html",
    styleUrls: ["./mission-failed.component.scss"]
})
export class MissionFailedComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    share(): void {
        if (navigator.share) {
            navigator.share({
                title: "Sielo",
                text: "Hey Bro, You must check this out! :male-astronaut: Mission SILEO! :rocket:",
                url: "https://sielo.mgldev.hu"
            });
        }
    }

    get hasShare(): boolean {
        return !!navigator.share;
    }

}
