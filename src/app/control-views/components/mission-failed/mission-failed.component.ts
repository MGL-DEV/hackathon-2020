import { Component, OnInit } from "@angular/core";

import { StorageService } from "@core/services/storage.service";

@Component({
    selector: "app-mission-failed",
    templateUrl: "./mission-failed.component.html",
    styleUrls: ["./mission-failed.component.scss"]
})
export class MissionFailedComponent implements OnInit {

    public output = "";
    private speedOfPrintOut = 25;

    constructor(private storageService: StorageService) { }

    ngOnInit(): void {
        this.print(this.storageService.get("log").join("\n"));
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
