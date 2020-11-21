import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-report",
    templateUrl: "./report.component.html",
    styleUrls: ["./report.component.scss"]
})
export class ReportComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        setTimeout( () => this.next(), 2000);
    }

    next(): void {
        this.router.navigateByUrl("/jsm9000/report-success");
    }

}
