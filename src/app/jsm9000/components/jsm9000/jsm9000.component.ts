import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

interface Chapter {
    source: string,
    next: string
}

@Component({
    selector: "app-jsm9000",
    templateUrl: "./jsm9000.component.html",
    styleUrls: ["./jsm9000.component.scss"]
})
export class Jsm9000Component implements OnInit {

    public chapter: Chapter;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.chapter = route.snapshot.data.chapter;
    }

    ngOnInit(): void {
    }

    next(): void {
        setTimeout(() => this.router.navigateByUrl(this.chapter.next), 1000);
    }

}
