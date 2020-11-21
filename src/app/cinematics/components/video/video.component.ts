import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

interface Scene {
    source: string,
    next: string
}

@Component({
    selector: "app-video",
    templateUrl: "./video.component.html",
    styleUrls: ["./video.component.scss"]
})
export class VideoComponent implements OnInit {

    public scene: Scene;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.scene = route.snapshot.data.scene;
    }

    ngOnInit(): void {
        setTimeout( () => this.next(), 2000);
    }

    next(): void {
        this.router.navigateByUrl(this.scene.next);
    }

}
