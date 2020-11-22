import { Component, Input, OnInit } from "@angular/core";

import { JSM9000State } from "@app/jsm9000/models";

@Component({
    selector: "app-machine-face",
    templateUrl: "./machine-face.component.html",
    styleUrls: ["./machine-face.component.scss"]
})
export class MachineFaceComponent implements OnInit {

    @Input()
    public status = JSM9000State.Default;

    constructor() { }

    ngOnInit(): void {
    }

}
