import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

/*import { SoundEffectsService } from "@shared/services/sound-effects.service";
import { Sound } from "@shared/models";
*/
import { JSM9000State } from "@app/jsm9000/models";

interface Chapter {
    status: JSM9000State;
    source: string,
    next: string
}

@Component({
    selector: "app-jsm9000",
    templateUrl: "./jsm9000.component.html",
    styleUrls: ["./jsm9000.component.scss"]
})
export class Jsm9000Component implements OnInit, OnDestroy {

    public chapter: Chapter;
    //public sound: Sound;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        //public soundEffectsService: SoundEffectsService,
    ) {
        this.chapter = route.snapshot.data.chapter;

        /*this.sound = this.soundEffectsService.get()
        if(this.chapter.status === JSM9000State.Success) {
            this.sound.track.get("winLoop").volume(10)
            this.sound.track.get("winLoop").play()
        }*/
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        /*if(this.chapter.status === JSM9000State.Success) {
            this.sound.track.get("winLoop").stop()
        }*/
    }

    next(): void {
        setTimeout(() => this.router.navigateByUrl(this.chapter.next), 1000);
    }

}
