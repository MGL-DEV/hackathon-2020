import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-jsm9000",
    templateUrl: "./jsm9000.component.html",
    styleUrls: ["./jsm9000.component.scss"]
})
export class Jsm9000Component implements OnInit {

    public chapter: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.chapter = route.snapshot.paramMap.get("chapter");
    }

    ngOnInit(): void {
    }

    next() {
        this.router.navigate(["/"]);
    }

}
