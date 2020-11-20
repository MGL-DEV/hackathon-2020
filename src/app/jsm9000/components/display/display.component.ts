import { Component, OnInit } from "@angular/core";

import { IDBService } from "@app/core/services/idb.service";

@Component({
    selector: "app-display",
    templateUrl: "./display.component.html",
    styleUrls: ["./display.component.scss"]
})
export class DisplayComponent implements OnInit {

    constructor(public IDB: IDBService) { }

    ngOnInit(): void {
    }

}
