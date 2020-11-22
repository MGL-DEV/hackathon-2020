import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-alien-hunting",
    templateUrl: "./alien-hunting.component.html",
    styleUrls: ["./alien-hunting.component.scss"]
})
export class AlienHuntingComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        setTimeout( () => this.next(), 2000);
    }

    next(): void {
        this.router.navigateByUrl("/jsm9000/alien-hunting-success");
    }

}