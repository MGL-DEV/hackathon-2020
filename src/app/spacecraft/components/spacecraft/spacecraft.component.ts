import { Component, OnInit,OnDestroy, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { SoundEffectsService } from "@shared/services/sound-effects.service";
import { Sound } from "@shared/models";

import { timer } from "rxjs";

import { Wipe } from "@app/spacecraft/models";

@Component({
    selector: "app-spacecraft",
    templateUrl: "./spacecraft.component.html",
    styleUrls: ["./spacecraft.component.scss"]
})
export class SpacecraftComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild("canvas", { static: false })
    public canvas: ElementRef;

    @ViewChild("default", { static: false })
    public default: ElementRef;

    @ViewChild("canvasScratched", { static: false })
    public canvasScratched: ElementRef;

    @ViewChild("progress", { static: false })
    public progress: ElementRef;

    public eventSuccess = this.handleSucces.bind(this)

    public timeout = null
    public sound: Sound;
    public countdown = 20
    public timerSubscribe = null

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public soundEffectsService: SoundEffectsService,
    ) { }

    ngOnInit(): void {
        this.sound = this.soundEffectsService.get()
        this.sound.track.get("gameLoop").playLoop()
        window.addEventListener("successWipe", this.eventSuccess, false)

        const source = timer(1000, 100);
        this.timerSubscribe = source.subscribe(val => {
            this.countdown -= 0.1
            if(this.progress.nativeElement) {
                this.progress.nativeElement.style.width = `${this.countdown / 20 * 100}%`
            }
            if(this.countdown <= 0) {
                this.countdown = 0
                //this.fail()
                this.timerSubscribe.unsubscribe()
            }
        });
    }

    handleSucces() {
        this.next()
        this.sound.track.get("gameLoop").stop()
        this.timerSubscribe.unsubscribe()
    }

    ngAfterViewInit(): void {
        if(this.default.nativeElement) {
            this.default.nativeElement.style.width = `${window.innerWidth}px`
            this.default.nativeElement.style.height = `${window.innerHeight}px`
        }

        const model = new Wipe({
            scale: {
                width: window.innerWidth,
                height: window.innerHeight,
                canvasObject: this.canvas.nativeElement,
                canvasProc: this.canvasScratched.nativeElement
            },
            images: [
                {
                    key: "mask",
                    value: "./assets/images/hole_1.jpg",
                    size: {
                        width: 1210,
                        height: 2150
                    }
                }
            ]
        })
    }

    ngOnDestroy() {
        this.sound.track.get("gameLoop").stop()
        this.timerSubscribe.unsubscribe()
        window.removeEventListener("successWipe", this.eventSuccess, false)
    }

    next(): void {
        this.router.navigateByUrl("/jsm9000/spacecraft-success");
    }

    fail(): void {
        this.router.navigateByUrl("/mission-failed")
    }
}
