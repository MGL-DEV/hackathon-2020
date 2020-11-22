import { Component, OnInit } from "@angular/core";
import { animate, state, style, transition, trigger } from "@angular/animations";
import { Router } from "@angular/router";
import { StorageService } from "@app/core/services/storage.service";
import { WebsocketService } from "@shared/services/websocket.service";

import { AsteroidsService } from "@app/asteroid-field/services/asteroids.service";

@Component({
    selector: "app-launch-screen",
    templateUrl: "./launch-screen.component.html",
    styleUrls: ["./launch-screen.component.scss"],
    animations: [
        trigger("log", [
            state("void", style({transform: "translateY(100vh)"})),
            state("*", style({transform: "translateY(0vh)"})),
            transition("* <=> *", [animate("500ms cubic-bezier(0.55, 0.30, 0.15, 0.90)")])
        ])
    ]
})
export class LaunchScreenComponent implements OnInit {

    public visibleLog = false;

    constructor(
        private router: Router,
        private asteroidsService: AsteroidsService,
        public storage: StorageService,
        public websocketService: WebsocketService
    ) { }

    ngOnInit(): void {
        this.asteroidsService.generate();

        this.storage.set("log", ["Successful takeoff"])
        setTimeout(() => {
            this.websocketService.send({
                status: 1
            })
        }, 1000)
    }

    start(): void {
        this.storage.append("log", "JSM 9000 is booting")
        this.websocketService.send({
            status: 2
        })
        document.documentElement.requestFullscreen();
        this.router.navigateByUrl("/cinematics/introduction");
    }

}
