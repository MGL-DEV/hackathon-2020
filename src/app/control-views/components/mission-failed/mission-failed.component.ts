import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-mission-failed",
    templateUrl: "./mission-failed.component.html",
    styleUrls: ["./mission-failed.component.scss"]
})
export class MissionFailedComponent implements OnInit {

    public output = "";
    private speedOfPrintOut = 15;

    constructor() { }

    ngOnInit(): void {
        this.print("Hey cowboy! Welcome on board. I will be your AI assistence during the mission. My name is JSM9000. What is your name? Hey cowboy! Welcome on board. I will be your AI assistence during the mission. My name is JSM9000. What is your name? Hey cowboy! Welcome on board. I will be your AI assistence during the mission. My name is JSM9000. What is your name? Hey cowboy! Welcome on board. I will be your AI assistence during the mission. My name is JSM9000. What is your name?");
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
