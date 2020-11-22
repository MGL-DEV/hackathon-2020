import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@shared/shared.module";
import { ControlViewsRoutingModule } from "./control-views-routing.module";
import { LaunchScreenComponent, BigRedButtonComponent, MissionFailedComponent } from "./components";

@NgModule({
    declarations: [
        LaunchScreenComponent,
        BigRedButtonComponent,
        MissionFailedComponent
    ],
    imports: [
        CommonModule,
        ControlViewsRoutingModule,
        SharedModule
    ]
})
export class ControlViewsModule { }
