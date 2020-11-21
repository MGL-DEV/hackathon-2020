import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-machine-face",
    templateUrl: "./machine-face.component.html",
    styleUrls: ["./machine-face.component.scss"]
})
export class MachineFaceComponent implements OnInit {

    @Input() alarm: boolean;

    constructor() { }

    ngOnInit(): void {
    }

}
