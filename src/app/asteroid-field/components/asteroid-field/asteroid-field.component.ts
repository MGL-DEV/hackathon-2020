import { Component, ElementRef, AfterViewInit, ViewChild } from "@angular/core";

@Component({
    selector: "app-asteroid-field",
    templateUrl: "./asteroid-field.component.html",
    styleUrls: ["./asteroid-field.component.scss"]
})
export class AsteroidFieldComponent implements AfterViewInit {

    @ViewChild("canvas")
    public canvas: ElementRef<HTMLCanvasElement>;
    public context: CanvasRenderingContext2D;

    constructor() { }

    ngAfterViewInit(): void {
        this.context = this.canvas.nativeElement.getContext("2d");
    }

}
