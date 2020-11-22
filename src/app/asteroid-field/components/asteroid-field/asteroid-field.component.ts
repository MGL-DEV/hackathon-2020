import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { StorageService } from "@app/core/services/storage.service";
import { WebsocketService } from "@shared/services/websocket.service";

import { AsteroidsService } from "@app/asteroid-field/services/asteroids.service";
/*import { SoundEffectsService } from "@shared/services/sound-effects.service";
import { Sound } from "@shared/models";*/

import { Asteroid } from "@app/asteroid-field/models";

@Component({
    selector: "app-asteroid-field",
    templateUrl: "./asteroid-field.component.html",
    styleUrls: ["./asteroid-field.component.scss"]
})
export class AsteroidFieldComponent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild("canvas", { static: false })
    public canvas: ElementRef;

    public eventDestroy = this.handleEventDestroy.bind(this)
    public timeout = null
    //public sound: Sound;
    public asteroid: Asteroid

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        //public soundEffectsService: SoundEffectsService,
        public asteroidsService: AsteroidsService,
        public storage: StorageService,
        public websocketService: WebsocketService
    ) { }

    handleEventDestroy() {
        //this.sound.track.get("explosion").play()
        clearTimeout(this.timeout)

        this.fail()
        try {
            navigator.vibrate([200, 200])
        } catch (error) { }
    }

    ngOnInit(): void {
        this.storage.append("log", "The ship is in an asteroid field")
        this.websocketService.send({
            status: 7
        })
        this.timeout = setTimeout(() => this.next(), 50000);
        /*this.sound = this.soundEffectsService.get()
        this.sound.track.get("gameLoop").playLoop()*/

        window.addEventListener("shipDestroyed", this.eventDestroy, false)
    }

    ngOnDestroy() {
        /*this.sound.track.get("explosion").stop()
        this.sound.track.get("gameLoop").stop()*/
        window.removeEventListener("shipDestroyed", this.eventDestroy, false)
        this.asteroid.unsubscribe()
    }

    ngAfterViewInit(): void {
        this.asteroidsService.get((data: any = {}) => {
            this.asteroid = new Asteroid({
                asteroids: data.value,
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
                            width: 70,
                            height: 83
                        }
                    }, {
                        key: "asteorid_2",
                        value: "./assets/images/ASTEROID_2.png",
                        size: {
                            width: 80,
                            height: 85
                        }
                    }, {
                        key: "asteorid_3",
                        value: "./assets/images/ASTEROID_3.png",
                        size: {
                            width: 80,
                            height: 96
                        }
                    }, {
                        key: "asteorid_4",
                        value: "./assets/images/ASTEROID_4.png",
                        size: {
                            width: 70,
                            height: 83
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
        })
    }

    next(): void {
        this.storage.append("log", " The ship survived the asteroid field")
        this.websocketService.send({
            status: 8
        })
        this.router.navigateByUrl("/jsm9000/asteroid-field-success");
    }

    fail(): void {
        this.router.navigateByUrl("/mission-failed")
    }
}