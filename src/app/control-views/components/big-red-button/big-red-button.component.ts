import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "@app/core/services/storage.service";
import { WebsocketService } from "@shared/services/websocket.service";

@Component({
    selector: "app-big-red-button",
    templateUrl: "./big-red-button.component.html",
    styleUrls: ["./big-red-button.component.scss"]
})
export class BigRedButtonComponent implements OnInit {

    constructor(private router: Router, public storage: StorageService, public websocketService: WebsocketService) { }

    ngOnInit(): void {
        this.storage.append("log", "Red Button disorder")
        this.websocketService.send({
            status: 3
        })
    }

    explosion(): void {
        this.storage.append("log", "Explosion at the orbit wheel")
        this.websocketService.send({
            status: 4
        })
        this.router.navigateByUrl("/cinematics/explode");
    }

}
