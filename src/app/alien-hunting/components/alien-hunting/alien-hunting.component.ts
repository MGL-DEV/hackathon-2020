import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { StorageService } from "@app/core/services/storage.service";
import { WebsocketService } from "@shared/services/websocket.service";

/*import { SoundEffectsService } from "@shared/services/sound-effects.service";
import { Sound } from "@shared/models";*/

@Component({
    selector: "app-alien-hunting",
    templateUrl: "./alien-hunting.component.html",
    styleUrls: ["./alien-hunting.component.scss"]
})
export class AlienHuntingComponent implements OnInit, OnDestroy {

    public event = this.handleEvent.bind(this)

    public bottomClear = false
    public topClear = false
    public bottom = false
    public top = false
    public side = false
    public shots = 0

    //public sound: Sound;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        // public soundEffectsService: SoundEffectsService,
        public storage: StorageService,
        public websocketService: WebsocketService
    ) { }

    ngOnInit(): void {
        this.storage.append("log", "Alien attack")
        this.websocketService.send({
            status: 9
        })
        window.addEventListener("deviceorientation", this.event, false)
        //this.sound = this.soundEffectsService.get()
    }

    ngOnDestroy() {
        window.removeEventListener("deviceorientation", this.event, false)
        //this.sound.track.get("laserPew").stop()
    }

    handleEvent(event): void {
        if (this.bottomClear === true && (event.beta > -2 && event.beta < 10 || event.beta > 165)) {
            this.bottomClear = false
        }

        if (this.bottomClear === false && (event.beta < 5 && event.beta > -50 || event.beta < -170)) {
            this.bottom = true
        }

        if (this.topClear === true && (event.beta > -2 && event.beta < 5 || event.beta > 170)) {
            this.topClear = false
        }

        if (this.topClear === false && (event.beta < 50 && event.beta > 7 || event.beta > 150)) {
            this.top = this.bottom === true
        }

        if (event.gamma > 60 || event.gamma < -60) {
            this.side = true
        } else {
            this.side = false
        }
        this.shot()
    }

    shot() {
        if (this.side === false || this.bottom === false || this.top === false) return false;
        //this.sound.track.get("laserPew").stop()
        navigator.vibrate(200);
        this.bottom = false
        this.top = false
        this.bottomClear = true
        this.topClear = true
        this.shots++
        //this.sound.track.get("laserPew").play()
        if (this.shots >= 4) {
            this.next()
        }
    }

    next(): void {
        this.router.navigateByUrl("/jsm9000/alien-hunting-success");
    }
}
