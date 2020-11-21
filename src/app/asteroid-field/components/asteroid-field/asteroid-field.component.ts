import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from "@angular/core";

import { AsteroidsService } from "@app/asteroid-field/services/asteroids.service";
import { SoundEffectsService } from "@shared/services/sound-effects.service";
import { Sound } from "@shared/models";

import { Asteroid } from "@app/asteroid-field/models";

@Component({
    selector: "app-asteroid-field",
    templateUrl: "./asteroid-field.component.html",
    styleUrls: ["./asteroid-field.component.scss"]
})
export class AsteroidFieldComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild("canvas", { static: false }) canvas: ElementRef;

    public eventDestroy = this.handleEventDestroy.bind(this)

    public sound: Sound;

    constructor(
            public soundEffectsService: SoundEffectsService,
            public asteroidsService: AsteroidsService
        ) {
    }

    handleEventDestroy() {
        this.sound.track.get("explosion").play()
        try {
            navigator.vibrate([200,200])
        } catch (error) { }
    }

    ngOnInit(): void {
        this.sound = this.soundEffectsService.get()
        this.sound.track.get("gameLoop").playLoop()

        window.addEventListener("shipDestroyed", this.eventDestroy, false)
    }

    ngOnDestroy() {
        window.removeEventListener("shipDestroyed", this.eventDestroy, false)
    }

    ngAfterViewInit(): void {
        this.asteroidsService.generate()
        console.log(this.asteroidsService.get())
        const asteroid = new Asteroid({
            scale: {
                width: window.innerWidth,
                height: window.innerHeight,
                canvasObject: this.canvas.nativeElement
            },
            images: [
                {
                    key: "asteorid_1",
                    value: "./assets/images/ASTEROID_1.png",
                    size: {
                        width: 99,
                        height: 118
                    }
                }, {
                    key: "asteorid_2",
                    value: "./assets/images/ASTEROID_2.png",
                    size: {
                        width: 123,
                        height: 130
                    }
                }, {
                    key: "asteorid_3",
                    value: "./assets/images/ASTEROID_3.png",
                    size: {
                        width: 109,
                        height: 130
                    }
                }, {
                    key: "asteorid_4",
                    value: "./assets/images/ASTEROID_4.png",
                    size: {
                        width: 87,
                        height: 103
                    }
                }, {
                    key: "ship",
                    value: "./assets/images/ship.png",
                    size: {
                        width: 54,
                        height: 141
                    }
                }, {
                    key: "star_background",
                    value: "./assets/images/star_background.png",
                    size: {
                        width: 1075,
                        height: 1920
                    }
                }, {
                    key: "background",
                    value: "./assets/images/asteroid_background.png",
                    size: {
                        width: 1080,
                        height: 1920
                    }
                }, {
                    key: "fog_background",
                    value: "./assets/images/fog_background.png",
                    size: {
                        width: 2000,
                        height: 2000
                    }
                }
            ]
        })
    }

}
