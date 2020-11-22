import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { StorageService } from "@app/core/services/storage.service";
import { WebsocketService } from "@shared/services/websocket.service";

/*import { SoundEffectsService } from "@shared/services/sound-effects.service";
import { Sound } from "@shared/models";*/

import { timer } from "rxjs";

import { Rotate } from "@app/run/models";

@Component({
    selector: "app-run",
    templateUrl: "./run.component.html",
    styleUrls: ["./run.component.scss"]
})
export class RunComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild("canvas", { static: false })
    public canvas: ElementRef;

    @ViewChild("progress", { static: false })
    public progress: ElementRef;

    public timeout = null
    //public sound: Sound;
    public countdown = 30
    public timerSubscribe = null
    public requiredSpeed = 0.5
    public rotate: Rotate

    constructor(
        private route: ActivatedRoute,
        private router: Router,
       // public soundEffectsService: SoundEffectsService,
        public storage: StorageService,
        public websocketService: WebsocketService
    ) { }

    ngOnInit(): void {
        this.storage.append("log", "Orbit wheel stopped")
        this.websocketService.send({
            status: 10
        })
        /*this.sound = this.soundEffectsService.get()
        this.sound.track.get("gameLoop").playLoop()*/

        const source = timer(1000, 100);
        this.timerSubscribe = source.subscribe(val => {
            this.countdown -= 0.1

            if (this.countdown <= 0) {
                this.countdown = 0
                this.fail()
                this.timerSubscribe.unsubscribe()
            }
        });

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position): void => {
                if (this.progress.nativeElement) {
                    this.progress.nativeElement.style.width = `${position.coords.speed / this.requiredSpeed * 100}%`
                }
                const prec70 = 0.7 * this.requiredSpeed
                if (position.coords.speed >= prec70) {
                    //this.sound.track.get("gameLoop").stop()
                    this.timerSubscribe.unsubscribe()
                    this.storage.append("log", "Orbit wheel works again")
                    this.websocketService.send({
                        status: 11
                    })
                    this.next()
                }
            }, (error) => {
                console.log(error)
            }, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            });
        }
    }

    ngOnDestroy() {
        //this.sound.track.get("gameLoop").stop()
        this.timerSubscribe.unsubscribe()
        this.rotate.unsubscribe()
    }

    ngAfterViewInit(): void {
        this.rotate = new Rotate({
            requiredSpeed: this.requiredSpeed,
            scale: {
                width: window.innerWidth,
                height: window.innerHeight,
                canvasObject: this.canvas.nativeElement
            },
            images: [
                {
                    key: "ship",
                    value: "./assets/images/ship_front.png",
                    size: {
                        width: 350,
                        height: 350
                    }
                }
            ]
        })
    }

    next(): void {
        this.router.navigateByUrl("/jsm9000/run-success");
    }

    fail(): void {
        this.router.navigateByUrl("/mission-failed")
    }
}
