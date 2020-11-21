import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CinematicsRoutingModule } from "./cinematics-routing.module";
import { VideoComponent } from "./components";

@NgModule({
    declarations: [VideoComponent],
    imports: [
        CommonModule,
        CinematicsRoutingModule
    ]
})
export class CinematicsModule { }
