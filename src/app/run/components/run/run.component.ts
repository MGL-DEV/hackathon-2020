import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild  } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { SoundEffectsService } from "@shared/services/sound-effects.service";
import { Sound } from "@shared/models";

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

    public eventWin = this.handleEventWin.bind(this)
    public timeout = null
    public sound: Sound;
    public countdown = 30
    public timerSubscribe = null
    public requiredSpeed = 0.5

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public soundEffectsService: SoundEffectsService,
    ) { }

    ngOnInit(): void {
        this.sound = this.soundEffectsService.get()
        this.sound.track.get("gameLoop").playLoop()
        window.addEventListener("shipDestroyed", this.eventWin, false)

        const source = timer(1000, 100);
        this.timerSubscribe = source.subscribe(val => {
            this.countdown -= 0.1

            if(this.countdown <= 0) {
                this.countdown = 0
                this.fail()
                this.timerSubscribe.unsubscribe()
            }
        });

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position):void => {
                if(this.progress.nativeElement) {
                    this.progress.nativeElement.style.width = `${position.coords.speed / this.requiredSpeed * 100}%`
                }
                if(position.coords.speed >= this.requiredSpeed) {
                    this.sound.track.get("gameLoop").stop()
                    window.removeEventListener("shipDestroyed", this.eventWin, false)
                    this.timerSubscribe.unsubscribe()
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
        this.sound.track.get("gameLoop").stop()
        window.removeEventListener("shipDestroyed", this.eventWin, false)
        this.timerSubscribe.unsubscribe()
    }

    handleEventWin() {
        this.sound.track.get("explosion").play()
        clearTimeout(this.timeout)

        this.next()
        try {
            navigator.vibrate([200,200])
        } catch (error) { }
    }

    ngAfterViewInit(): void {
        const asteroid = new Rotate({
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
