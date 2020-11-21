import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-spacecraft",
    templateUrl: "./spacecraft.component.html",
    styleUrls: ["./spacecraft.component.scss"]
})
export class SpacecraftComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        setTimeout( () => this.next(), 2000);
    }

    next(): void {
        this.router.navigateByUrl("/jsm9000/spacecraft-success");
    }

}
