import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
@Component({
    selector: "app-launch-screen",
    templateUrl: "./launch-screen.component.html",
    styleUrls: ["./launch-screen.component.scss"]
})
export class LaunchScreenComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    start(): void {
        document.documentElement.requestFullscreen();
        this.router.navigateByUrl("/jsm9000/introduction");
    }

}
