import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { CinematicsRoutingModule } from "./cinematics-routing.module";
import { VideoComponent } from "./components";

@NgModule({
    declarations: [VideoComponent],
    imports: [
        CommonModule,
        CinematicsRoutingModule,
        SharedModule
    ]
})
export class CinematicsModule { }
