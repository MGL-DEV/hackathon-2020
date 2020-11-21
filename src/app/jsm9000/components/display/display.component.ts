import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-display",
    templateUrl: "./display.component.html",
    styleUrls: ["./display.component.scss"]
})
export class DisplayComponent implements OnInit {

    public output = "";
    private speedOfPrintOut = 50;

    constructor() { }

    ngOnInit(): void {
        this.print("display works!");
    }

    print(output) {
        [...output].forEach((letter, index) => {
            setTimeout(() => this.output += letter, index * this.speedOfPrintOut);
        });
    }

}
