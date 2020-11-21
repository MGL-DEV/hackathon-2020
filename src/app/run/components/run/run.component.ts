import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-run",
    templateUrl: "./run.component.html",
    styleUrls: ["./run.component.scss"]
})
export class RunComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        setTimeout( () => this.next(), 2000);
    }

    next(): void {
        this.router.navigateByUrl("/jsm9000/run-success");
    }

}
