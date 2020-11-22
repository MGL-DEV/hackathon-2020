import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "@app/core/services/storage.service";
import { WebsocketService } from "@shared/services/websocket.service";

import { AsteroidsService } from "@app/asteroid-field/services/asteroids.service";

@Component({
    selector: "app-launch-screen",
    templateUrl: "./launch-screen.component.html",
    styleUrls: ["./launch-screen.component.scss"]
})
export class LaunchScreenComponent implements OnInit {

    constructor(
        private router: Router,
        private asteroidsService: AsteroidsService,
        public storage: StorageService,
        public websocketService: WebsocketService
    ) { }

    ngOnInit(): void {

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position): void => {
                console.log('ok')
            }, (error) => {
                console.log(error)
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        }
        if (navigator.mediaDevices !== undefined && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                video: {
                    width: 0,
                    height: 0
                }
            })
        }

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
        this.asteroidsService.generate();
        this.router.navigateByUrl("/cinematics/introduction");
    }

}
