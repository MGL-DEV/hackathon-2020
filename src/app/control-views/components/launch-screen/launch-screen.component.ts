import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AsteroidsService } from "@app/asteroid-field/services/asteroids.service";

@Component({
    selector: "app-launch-screen",
    templateUrl: "./launch-screen.component.html",
    styleUrls: ["./launch-screen.component.scss"]
})
export class LaunchScreenComponent implements OnInit {

    constructor(private router: Router, private asteroidsService: AsteroidsService) { }

    ngOnInit(): void {
    }

    start(): void {
        document.documentElement.requestFullscreen();
        this.asteroidsService.generate();
        this.router.navigateByUrl("/jsm9000/introduction");
    }

}
